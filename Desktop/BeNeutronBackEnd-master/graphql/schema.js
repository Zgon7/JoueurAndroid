const { buildSchema } = require('graphql');


module.exports = buildSchema(`

    type Course {
        _id: ID!
        name: String!
        description: String!
        price: Float!
        duration: Int!
    }
    
    type ClientCourse {
        _id: Course
        orderDate: String
    }
    
    type CourseEnrolled {
      enrolled : [ClientCourse]
    }
    
    type Client {
        _id: ID!
        firstName: String!
        familyName: String!
        email: String
        password: String!
        birthday: String!
        country: String!
        city: String!
        phone: Int!
        courses: CourseEnrolled
    }

    input UserInputData {
        firstName: String!
        familyName: String!
        email: String!
        password: String!
        birthday: String!
        country: String!
        city: String!
        phone: Int!
    }
     type AuthData {
        token: String!
        userId: String!
    }
    
    input CourseInputData {
        name: String!
        description: String!
        price: Float!
        duration: Int!
    }
    
    type RootQuery {
        getClient(id: ID!): Client!
        getClientCourses (id: ID!): [Course]
        getCourse(id: ID!): Course!
        login(email: String! , password: String!): AuthData!
        stripePay(amount: Int!): String
    }
    

    
    
    type RootMutation {
        createClient(userInput: UserInputData!): Client!
        updateClient(id: ID! , userInput: UserInputData!): Client!
        clientForgotPassword(email: String!): String!
        clientChangePassword(token: String!, password: String!): Client!
        activateAccount(token: String!): String!
        createCourse(courseInput: CourseInputData!): Course!
        clientAddCourse(idClient: ID!, idCourse: ID!): Client!
        sendVerification(email: String!): String!
    }

    schema {
        query: RootQuery    
        mutation: RootMutation
    }
    
    
`);