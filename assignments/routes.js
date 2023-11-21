import db from "../Database/index.js";
function AssignmentRoutes(app) {
  // get all assignments
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((m) => m.course === cid);
    res.send(assignments);
  });

  // create new assignment
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  // update assignment
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (assignment) => assignment._id === id
    );
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(200);
  });

  // delete assignment
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== id
    );
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
