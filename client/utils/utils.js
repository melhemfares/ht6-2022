import { Dimensions } from 'react-native';


export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};


// // type: "POST" | "GET"
// export const pbFetch = (route, type, encoded) => {
//   return new Promise(function (resolve, reject) {
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.open(type, 'localhost:3001');
//     xmlhttp.responseType='arraybuffer';
//     xmlhttp.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
//     xmlhttp.onreadystatechange = (e) => {
//       if (xmlhttp.readyState !== 4) {
//         return;
//       }
//       if ( xmlhttp.status === 200 ) {
//         resolve(xmlhttp.response)
//       } else {
//         console.log({
//           status: xmlhttp.status,
//           statusText: xmlhttp.statusText
//         });
//         reject(xmlhttp.status);
//       }
//     };
//     xmlhttp.send(encoded);
//   })
// }