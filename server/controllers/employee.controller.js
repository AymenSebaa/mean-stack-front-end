
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
var ObjectId = mongoose.Types.ObjectId;

function handleError(res, reason, message, code){
    console.log("ERROR: ", reason);
    res.status(code || 500).json({"error": message});
}

module.exports.getAll = (req, res, next) => {
    Employee.find( (err, docs) => {
        if(err){
            handleError(res, err.message, 'Faild to get employees.');
        } else {
            res.status(200).json(docs);
        }
    } );
};
module.exports.create = (req, res, next) => {
    delete req.body._id;
    var newEmployee = Employee(req.body);
    // newEmployee.createdAt = new Date();
    newEmployee.save( (err, doc) =>{
        if(err){
            handleError(res, err.message, 'Faild to create new employee.');
        } else {
            res.status(201).json(doc)
        }
    } );
};

module.exports.get = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        handleError(res, err.message, 'Invalide ObjectID', 400);
    } else {
        var employee = Employee.findById(req.params.id , (err, doc) => {
            if(err){
                handleError(res, err.message, 'Faild to get emplyee');
            } else {
                res.status(200).json(doc);
            }
        });
    }
};
module.exports.update = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        handleError(res, 'Invalide ObjectID', 400);
    } else {
        Employee.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc) => {
            if(err){
                handleError(res, err.message, 'Faild to update employee');
            } else {
                res.status(200).json(doc); 
            }
        });
    } 
};
module.exports.delete = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        handleError(res, 'Invalide ObjectID', 400);
    } else {
        Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
            if(err){
                handleError(res, err.message, 'Faild to delete employee');
            } else {
                res.status(200).json(doc); 
            }
        });
    }
};
