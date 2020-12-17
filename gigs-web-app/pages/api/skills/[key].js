const skills = [
    "Node",
    "ReactJS",
    "Teaching",
    "TensorFlow",
    "Quantum Physics",
    "Quantum Computing",
    "Scientist",
    "Research",
    "Marketing",
    "Angular"
]

export default (req, res) => {
    res.statusCode = 200
    res.json(skills)
  }