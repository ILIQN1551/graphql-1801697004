const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} =  require('graphql');
const ClientType = new GraphQLObjectType({
    name:'client',
    fields:() => ({
        id:{type:GraphQLInt},
        fname:{type:GraphQLString},
        lname:{type:GraphQLString},
        phone:{type:GraphQLString},
        email:{type:GraphQLString},
        city:{type:GraphQLString},
        education:{type:GraphQLString}
    })
});
const axios = require('axios');
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        client:{
            type:ClientType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue,args){              
                    return axios.get('http://localhost:3000/clients/' + args.id).then(res => res.data);
                
            }
        },
        clients:{
             type: new GraphQLList(ClientType),
             resolve(parentValue,args){
                 return clients;
             }
        }
    }
});
//mutation
const mutation = new GraphQLObjectType({
    name:'mutation',
    fields:{
        addClient:{
            type:ClientType,
            args:{
                fname:{type: new GraphQLNonNull(GraphQLString)},
                lname:{type: new GraphQLNonNull(GraphQLString)},
                phone:{type: new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                city:{type: new GraphQLNonNull(GraphQLString)},
                education:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/clients/',{
                    fname:args.fname,
                    lname:args.lname,
                    phone:args.phone,
                    email: args.email,
                    city: args.city,
                    education:args.education
                })
                .then(res => res.data);
            }
            
        },deleteClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/clients/'+ args.id)
                .then(res => res.data);
            }
            
        },updateClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                fname:{type:GraphQLString},
                lname:{type:GraphQLString},
                phone:{type:GraphQLString},
                email:{type:GraphQLString},
                city:{type:GraphQLString},
                education:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/clients/'+ args.id,args)
                .then(res => res.data);
            }
            
        }
    }
});
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
});