const User=require('../models/user');




module.exports.profile=async function(req,res){
    // res.end('<h1>User Profile</h1>');
    // title:
    console.log(req.user);
    return res.render('user_profile',{
       title:'User Profile'
     });
    
    // if(req.cookies.user_id){
    //     const user=await User.findById(req.cookies.user_id)
    //         if(user){
    //             return res.render('user_profile',{
    //                 title:"User Profile",
    //                 user:user
    //             })
    //         }
    //         return res.redirect('/users/sign-in');
        
    // }else{
    //     return res.redirect('/users/sign-in');
    // }
    // console.log(req.user);
    // return res.render('user_profile');
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

module.exports.create= async function(req,res){
    try{
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
    const user=await User.findOne({email: req.body.email});
      
        if(!user){
            
                const newuser=await User.create(req.body);
                return res.redirect('/users/sign-in');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){console.log(err);
    res.redirect('back');
    }
}

// module.exports.createSession=async function(req,res){
//    try{
//     if(req.body.password !=req.body.confirm_password){
//         return res.redirect('back');
//     }
//     const user=await User.findOne({email:req.body.email});
        
//         if(user){
//             console.log(req.body);
//             const newuser=await User.create(req.body);
//                 return res.redirect('/users/profile');
//             }else{
//            // res.cookie('user_id',user.id);
//             return res.redirect('back');
//             }
//         }catch(err){console.log(err);
//              res.redirect('back');
//         }
    
// }
// try{
//     if(req.body.password !=req.body.password){
//         return res.redirect('back');
//     }
//     const user=await User.findOne({email: req.body.email});
      
//         if(!user){
//             console.log(req.body);
//                 const newuser=await User.create(req.body);
//                 return res.redirect('/users/profile');
            
//         }else{
//             return res.redirect('back');
//         }
//     }catch(err){console.log(err);
//     res.redirect('back');
//     }
// }
// module.exports.createSession = function (req, res) {
//     //console.log('body',req.body);
//    User.findOne({ email: req.body.email })
//    .then((user) => {
//      if (user) {
//        if (user.password != req.body.password) {
//          // console.log('password does not match');
//          return res.redirect("back");
//        }
//        res.cookie("user_id", user.id);
//      //  console.log('redirct to profile');
//        return res.redirect("/users/profile");
//      } else {
//      //  console.log('user not found');
//        return res.redirect("back");
//      }
//    })
//    .catch((err)=>{
//     console.log('error in finding user in sign in', err);
//    })
    
//  }
// module.exports.createSession = async function (req, res) {
//     try {
//       const user = await User.findOne({ email: req.body.email });
  
//       if (user) {
//         if (user.password !== req.body.password) {
//           return res.redirect("back");
//         }
  
//         res.cookie("user_id", user.id);
//         return res.redirect("/users/profile");
//       } else {
//         return res.redirect("back");
//       }
//     } catch (err) {
//       console.log('error in finding user in sign in', err);
//     }
    
//   };
module.exports.createSession =  async function (req, res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(function(error){
        if(error){
            console.log(error)
            return next(error)
            
        }
        return res.redirect('/');
    });

}
