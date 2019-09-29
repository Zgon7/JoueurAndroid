const Course = require('../../models/course.js');



module.exports = {

getCourse: async function({id}, req) {
    const course = await Course.findById(id);
    if (!course)
        throw new Error('No Course Found !');

    return course;
},

createCourse: async function({ courseInput }, req) {
    const course = new Course({
        name: courseInput.name,
        description: courseInput.description,
        price: courseInput.price,
        duration: courseInput.duration
    });

    await course.save();
    return course;

},


};