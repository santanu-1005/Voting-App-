const express = require('express');
const router = express.Router();
const User = require('./../Models/Users');
const Candidate = require('./../Models/Candidates');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

const checkAdminRole = async(userId) => {
    try{
        const user = await User.findById(userId);
        if(user.role === "admin"){
            return true;
        }
    }
    catch(err){
        return false;
    }
}

router.post('/', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!(await checkAdminRole(req.user.userId))){
            return res.status(403).json({message: 'User is not having admin role'})
        }

        const data = req.body;

        const newCandidate = new Candidate(data);

        const response = await newCandidate.save();
        console.log('data saved');

        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.put('/:candidateID', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!(await checkAdminRole(req.user.userId))){
            return res.status(403).json({message: 'User is not having admin role'})
        }

        const candidateId = req.params.id;
        const updatedCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({error : 'Candidate Not Found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500),json({error: 'Internal Server Error'});
    }
});

router.delete('/:candidateId', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!(await checkAdminRole(req.user.userId))){
            return res.status(403).json({message: 'User is not having admin role'})
        }

        const candidateId = req.params.id;

        const response = await Candidate.findByIdAndDelete(candidateId);
        if(!response){
            return res.status(404).json({error : 'Candidate Not Found'});
        }

        console.log('Data Deleted');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500),json({error: 'Internal Server Error'});
    }
});

module.exports = router;