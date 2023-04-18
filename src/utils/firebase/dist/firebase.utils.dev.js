"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAuthUserWithEmailAndPassword = exports.createUserDocumentFromAuth = exports.db = exports.signInWithGooglePopup = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseConfig = {
  apiKey: 'AIzaSyCsOQYyEULJzHJ5smFWe70IW8zqfvVsO3I',
  authDomain: 'crwn-clothing-db-28cb6.firebaseapp.com',
  projectId: 'crwn-clothing-db-28cb6',
  storageBucket: 'crwn-clothing-db-28cb6.appspot.com',
  messagingSenderId: '558974862430',
  appId: '1:558974862430:web:7f7609904f3674c137a0cf'
}; // Initialize Firebase

var firebaseApp = (0, _app.initializeApp)(firebaseConfig);
var googleProvider = new _auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
}); // const twitterProvider = new TwitterAuthProvider();
// twitterProvider.setCustomParameters({
// 	prompt: 'select_account',
// });

var auth = (0, _auth.getAuth)(); // Google

exports.auth = auth;

var signInWithGooglePopup = function signInWithGooglePopup() {
  return (0, _auth.signInWithPopup)(auth, googleProvider);
}; // export const signInWithGoogleRedirect = () =>
// 	signInWithRedirect(auth, googleProvider);
// Twitter
// export const signInWithTwitterPopup = () =>
// 	signInWithPopup(auth, twitterProvider);


exports.signInWithGooglePopup = signInWithGooglePopup;
var db = (0, _firestore.getFirestore)();
exports.db = db;

var createUserDocumentFromAuth = function createUserDocumentFromAuth(userAuth) {
  var additionalInformation,
      userDocRef,
      userSnapshot,
      displayName,
      email,
      createdAt,
      _args = arguments;
  return regeneratorRuntime.async(function createUserDocumentFromAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          additionalInformation = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (userAuth) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          userDocRef = (0, _firestore.doc)(db, 'users', userAuth.uid);
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(userDocRef));

        case 6:
          userSnapshot = _context.sent;

          if (userSnapshot.exists()) {
            _context.next = 18;
            break;
          }

          displayName = userAuth.displayName, email = userAuth.email;
          createdAt = new Date();
          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(userDocRef, _objectSpread({
            displayName: displayName,
            email: email,
            createdAt: createdAt
          }, additionalInformation)));

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](10);
          console.error(_context.t0.message);

        case 18:
          return _context.abrupt("return", userDocRef);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 15]]);
};

exports.createUserDocumentFromAuth = createUserDocumentFromAuth;

var createAuthUserWithEmailAndPassword = function createAuthUserWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function createAuthUserWithEmailAndPassword$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!email || !password)) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _auth.createUserWithEmailAndPassword)(auth, email, password));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.createAuthUserWithEmailAndPassword = createAuthUserWithEmailAndPassword;