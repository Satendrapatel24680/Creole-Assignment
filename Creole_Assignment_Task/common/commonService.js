const { mongoose, Types } = require('mongoose');
const { userModel } = require('../model/product');
// const { Exam } = require('../model');
const ObjectId = mongoose.Types.ObjectId;

const create = async (Model, profile) => {
  try {
    const data = new Model(profile).save();
    return data;
  } catch (err) {
    return false;
  }
};

const updateByCondition = async (Model, condition, content = null) => {
  try {
    const data = await Model.findOneAndUpdate(condition, { $set: content }, { new: true });
    return data;
  } catch (err) {
    return false;
  }
};

const getById = async (Model, id, projection) => {
  try {
    const data = await Model.findById(id, projection).lean();
    return data;
  } catch (error) {
    return false;
  }
};

const findAll = async (Model, query, projection) => {
  try {
    const data = await Model.find(query, projection).sort({ 'updatedAt': -1 }).lean();
    return data;
  } catch (error) {
    return false;
  }
};

const getByCondition = async (Model, condition, projection) => {
  try {
    const data = await Model.findOne(condition, projection).lean();
    return data;
  } catch (error) {
    return false;
  }
};

const removeById = async (Model, id) => {
  try {
    const data = await Model.findByIdAndRemove(id);
    return data;
  } catch (error) {
    return false;
  }
};

const updateById = async (Model, id, profile = null) => {
  try {
    const data = await Model.findByIdAndUpdate(
      Types.ObjectId(id),
      { $set: profile },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const managerExamdetail = async (Model, object) => {
  try {
    let week = 0;
    if (object.status) {
      if (object.status === '1') { week = 1; }
      if (object.status === '2') { week = 4; }
    }
    const filterDate = new Date().setDate(new Date().getDate() - 7 * week);
    const data = await Model.aggregate([
      {
        $match: {
          examConductedBy: ObjectId(object.projectId),
          createdAt: { '$gte': new Date(filterDate) }
        }
      },
      {
        '$project':
        {
          'status': 1,
          '_id': 0
        }
      },
      {
        $group: {
          _id: '$status',
          totalExams: {
            $sum: 1
          }
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertManyData = async (Model, content) => {
  try {
    const data = Model.insertMany(content);
    return data;
  } catch (err) {
    return false;
  }
};

const deleteByField = async (Model, content) => {
  try {
    const data = await Model.findOneAndRemove(content);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }
};

const count = async (Model, condition) => {
  try {
    const data = await Model.countDocuments(condition);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }
};

const getList = async (Model, query, projection, option) => {
  try {
    const data = await Model.find(query, projection, option);
    return data;
  } catch (err) {
    return false;
  }
};

const findSingleByAggregation = async (Model, query, Model2 = null) => {
  try {
    const data = await Model.aggregate([
      { $match: { _id: ObjectId(query._id) } },
      {
        '$project': {
          'email': 1,
          'firstName': 1,
          'middleName': 1,
          'lastName': 1,
          'createdAt': 1,
          'pmId': '$userCode'
        }
      },
      {
        $lookup: {
          from: 'exams',
          localField: '_id',
          foreignField: 'examConductedBy',
          pipeline: [
            { $match: (query.status) ? { status: +query.status } : {} },
            // { $match: { isBulkUploaded: false } },
            {
              $lookup: {
                from: 'examdetails',
                localField: '_id',
                foreignField: 'examId',
                pipeline: [{
                  $match: {
                    $expr: {
                      $eq: ['$filledBy', 'project manager']
                    }
                  }
                }],
                as: 'examDetails'
              }
            },
            { $unwind: '$examDetails' },
            {
              $group: {
                '_id': '$_id',
                'basicInformation': { $first: '$basicInformation' },
                'stationary': { $first: '$stationary' },
                'partition': { $first: '$partition' },
                'itManagerRatio': { $first: '$itManagerRatio' },
                'guardRatio': { $first: '$guardRatio' },
                'invigilator': { $first: '$invigilator' },
                'diskForRecording': { $first: '$diskForRecording' },
                'refreshment': { $first: '$refreshment' },
                'metalDetector': { $first: '$metalDetector' },
                'phFriendly': { $first: '$phFriendly' },
                'webcam': { $first: '$webcam' },
                'biometric': { $first: '$biometric' },
                'backupInternat': { $first: '$backupInternat' },
                'secoundaryInternet': { $first: '$secoundaryInternet' },
                'primaryInternet': { $first: '$primaryInternet' },
                'cctv': { $first: '$cctv' },
                'dg': { $first: '$dg' },
                'ups': { $first: '$ups' },
                'cardToServer': { $first: '$cardToServer' },
                'nodeBuffer': { $first: '$nodeBuffer' },
                'supervisorToCandidate': { $first: '$supervisorToCandidate' },
                'serverToCandidate': { $first: '$serverToCandidate' },
                'jammer': { $first: '$jammer' },
                'waterBottle': { $first: '$waterBottle' },
                'registrationDesk': { $first: '$registrationDesk' },
                'status': { $first: '$status' },
                'additionalRequirement': { $first: '$additionalRequirement' },
                'totalSeat': { $sum: '$examDetails.totalCapacity' },
                'remark': { $first: '$remark' },
                'examConductedBy': { $first: '$examConductedBy' },
                'isEdited': { $first: '$isEdited' },
                'isBulkUploaded': { $first: '$isBulkUploaded' },
                'createdAt': { $first: '$createdAt' },
                'updatedAt': { $first: '$updatedAt' }
              }
            },
            // { $unset: ['examDetails'] },
            // { $match: { $expr: { $eq: ['isBulkUploaded', true] } } },
            { '$sort': { 'createdAt': -1 } },
            { $skip: (query.page * query.perPage) - query.perPage },
            { $limit: +query.perPage }
          ],
          as: 'Exams'
        }
      },
      // { $set: { totalSeats: { $sum: '$Exams.' } } },
      {
        $facet: {
          count: [
            { $count: 'total' },
            { $addFields: { page: +query.page } }
          ],
          data: [
            { $sort: { 'createdAt': -1 } },
            { $skip: (query.parent === 0) ? query.parent : (query.page * query.perPage) - query.perPage },
            { $limit: +query.perPage }
          ]
        }
      },
      { $unwind: '$count' }
    ]);
    if (Model2) {
      data[0].count.total = await Model2.find({ examConductedBy: query._id }).count();
    }

    return data;
  } catch (err) {
    return false;
  }
};

const deleteMany = async (Model, content = null) => {
  try {
    const data = await Model.deleteMany(content);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }
};

const findAndUpdateAggregate = async (Model, id) => {
  try {
    const data = await Model.find({ _id: id }).lean();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAllByAggregation = async (Model, condition, object) => {
  try {
    if (!object.perPage && !object.page) {
      object = {
        perPage: 10,
        page: 1
      };
    }
    if (condition && condition._id) {
      condition._id = ObjectId(condition._id);
    }
    if (condition && condition.examConductedBy) {
      condition.examConductedBy = ObjectId(condition.examConductedBy);
    }
    const data = await Model.aggregate([
      { $match: condition },
      {
        $set: {
          'pmId': '$userCode'
        }
      },
      {
        $lookup: {
          from: 'examdetails',
          localField: '_id',
          foreignField: 'examId',
          pipeline: [{
            $match: {
              $expr: {
                $eq: ['$filledBy', 'project manager']
              }
            }
          }],
          as: 'Exams'
        }
      },
      {
        '$facet': {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: +object.page } }
          ],
          data: [
            { $sort: { 'createdAt': -1 } },
            { $skip: (object.parent === 0) ? object.parent : (object.page * object.perPage) - object.perPage },
            { $limit: +object.perPage }
          ]
          // add projection here wish you re-shape the docs
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAllExamWithProject = async (Model, condition, object) => {
  try {
    if (condition && condition._id) {
      condition._id = ObjectId(condition._id);
    }
    if (condition && condition.examConductedBy) {
      condition.examConductedBy = ObjectId(condition.examConductedBy);
    }
    const data = await Model.aggregate([
      { '$match': condition },
      {
        $lookup: {
          from: 'users',
          localField: 'examConductedBy',
          foreignField: '_id',
          pipeline: [
            { $skip: (object.page * object.perPage) - object.perPage },
            { $limit: +object.perPage }
          ],
          as: 'Exams'
        }
      },
      {
        '$facet': {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: +object.page } }
          ],
          data: [
            { '$sort': { 'createdAt': -1 } },
            { $skip: (object.parent === 0) ? object.parent : (object.page * object.perPage) - object.perPage },
            { $limit: +object.perPage }
          ] // add projection here wish you re-shape the docs
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAllExamByProjectId = async (Model, condition, object, matchQuery = {}) => {
  try {
    if (condition && condition._id) {
      condition._id = ObjectId(condition._id);
    }
    if (condition && condition.examConductedBy) {
      condition.examConductedBy = ObjectId(condition.examConductedBy);
    }
    const data = await Model.aggregate([
      { '$match': condition },
      { '$sort': { 'createdAt': -1 } },
      {
        $lookup: {
          from: 'examdetails',
          localField: '_id',
          foreignField: 'examId',
          pipeline: [
            {
              $match: {
                $and: [matchQuery, {
                  $expr: {
                    $eq: ['$filledBy', 'project manager']
                  }
                }]
              }
            },
            { $skip: (object.page * object.perPage) - object.perPage },
            { $limit: +object.perPage }
          ],
          as: 'Exams'
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAllByPagination = async (Model, condition, object) => {
  try {
    if (condition && condition._id) {
      condition._id = ObjectId(condition._id);
    }
    if (object.status && object.status !== '') {
      condition.status = +object.status;
    }
    const data = await Model.aggregate([
      { '$match': {} },
      // { '$sort': { 'order_number': -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'examConductedBy',
          foreignField: '_id',
          pipeline: [{
            $addFields: {
              fullName: {
                $concat: ['$firstName', ' ', '$lastName']
              },
              pmId: '$userCode'
            }
          }],
          as: 'PmDetail'
        }
      },
      {
        $lookup: {
          from: 'examdetails',
          localField: '_id',
          foreignField: 'examId',
          pipeline: [{
            $match: {
              $expr: {
                $eq: ['$filledBy', 'project manager']
              }
            }
          }],
          as: 'totalSeat'
        }
      },
      {
        '$project': {
          'basicInformation.examinationName': 1,
          'basicInformation.startDateOfExam': 1,
          'basicInformation.endDateOfExam': 1,
          'status': 1,
          'PmDetail.fullName': 1,
          'PmDetail.pmId': 1,
          'totalSeat': {
            $sum: '$totalSeat.noOfSeats'
          },
          'createdAt': 1
        }
      }, {
        $unwind: '$PmDetail'
      },
      {
        '$facet': {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: +object.page } }
          ],
          data: [
            { '$sort': { 'createdAt': -1 } },
            { $skip: (object.page * object.perPage) - object.perPage },
            { $limit: +object.perPage }
          ] // add projection here wish you re-shape the docs
        }
      }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateMany = async (Model, condition, content) => {
  try {
    const data = await Model.updateMany(condition, { $set: content }, { new: true });
    return data;
  } catch (err) {
    return false;
  }
};

const desktopconfigsUrl = async (fileUrl) => {
  try {
    const data = await DesktopConfig.findOne({ $text: { $search: fileUrl } });
    return data;
  } catch (err) {
    return false;
  }
};

const networkDetailsUrl = async (centerId, key, fileUrl) => {
  try {
    let data;
    if (key === 'usableSwitchImage') {
      data = await Network.findOneAndUpdate({ centerId }, { $pull: { usableSwitchImage: fileUrl } });
    }
    if (key === 'backupSwitchImage') {
      data = await Network.findOneAndUpdate({ centerId }, { $pull: { backupSwitchImage: fileUrl } });
    }
    if (key === 'unmanageableSwitchImage') {
      data = await Network.findOneAndUpdate({ centerId }, { $pull: { unmanageableSwitchImage: fileUrl } });
    }
    if (key === 'manageableSwitchImage') {
      data = await Network.findOneAndUpdate({ centerId }, { $pull: { manageableSwitchImage: fileUrl } });
    }
    if (key === 'auditorImage') {
      data = await Network.findOneAndUpdate({ centerId }, { $pull: { auditorImage: fileUrl } });
    }
    // if (key === 'manageableSwitchImage') {
    //   data = await Network.updateOne({ centerId }, { $set: { usableSwitchImage: { $pull: fileUrl } } });
    // }
    return data;
  } catch (err) {
    return false;
  }
};

const centerUpdate = async (Model, centerId, value) => {
  try {
    const data = await Model.findOneAndUpdate({ centerId }, { $pull: value }, { new: true });
    return data;
  } catch (err) {
    return false;
  }
};

module.exports = {
  create,
  updateByCondition,
  getById,
  removeById,
  updateById,
  count,
  insertManyData,
  deleteByField,
  getByCondition,
  findAll,
  getList,
  findSingleByAggregation,
  deleteMany,
  findAndUpdateAggregate,
  findAllByAggregation,
  managerExamdetail,
  findAllByPagination,
  findAllExamByProjectId,
  findAllExamWithProject,
  updateMany,
  desktopconfigsUrl,
  networkDetailsUrl,
  centerUpdate
};
