const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
}; //exporting the helper methods

//GET /api/schemes/
function find() {
    return db('schemes');
}

//GET /api/schemes/:id
function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}


//showing I can use aliases here as well
//GET /api/schemes/:id/steps
function findSteps(id) {
    return db("schemes as sch")
        .join("steps as st", "sch.id", "st.scheme_id")
        .select("st.id", "sch.scheme_name", "st.step_number", "st.instructions")
        .orderBy("st.step_number")
        .where("st.scheme_id", id);
}

//POST /api/schemes
function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(id => {
            return findById(id[0]);
        });
}

/////////////////This is stretch\\\\\\\\\\\\\\\\\
//POST /api/schemes/:id/addStep
function addStep(step, scheme_id) {
    const newStep = {
        scheme_id: scheme_id,
        step_number: step.step_number,
        instructions: step.instructions
    };
    return db("steps")
        .insert(newStep)
        .then(id => {
            return findSteps(scheme_id);
        });
};
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\

//PUT /api/schemes:id
function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes);
}

//DELETE /api/schemes/:id
function remove(id) {
    return db("schemes")
        .where("id", id)
        .del();
}