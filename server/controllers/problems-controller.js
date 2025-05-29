const problems = require('../data/problems.json');

const getProblems = async (req, res) => {
    res.json(problems);
}

const getOneProblem = async (req, res) => {
    const problem = problems.find(p => p.id === req.params.id);
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
}

module.exports = { getProblems, getOneProblem };