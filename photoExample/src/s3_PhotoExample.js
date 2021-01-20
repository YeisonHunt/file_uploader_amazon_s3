"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html.
Purpose:
s3_PhotoExample.js demonstrates how to manipulate photos in albums stored in an Amazon S3 bucket.
Inputs (replace in code):
- BUCKET_NAME
- REGION
- IDENTITY_POOL_ID
Running the code:
node s3_PhotoExample.js
*/
// snippet-start:[s3.JavaScript.photoAlbumExample.completeV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.configV3]
// Load the required clients and packages
var CognitoIdentityClient = require("@aws-sdk/client-cognito-identity").CognitoIdentityClient;
var fromCognitoIdentityPool = require("@aws-sdk/credential-provider-cognito-identity").fromCognitoIdentityPool;
var _a = require("@aws-sdk/client-s3"), S3Client = _a.S3Client, ListObjectsCommand = _a.ListObjectsCommand;
// Set the AWS Region
var REGION = "us-east-1"; //REGION
// Initialize the Amazon Cognito credentials provider
var s3 = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: "us-east-1:5cd3f21f-df67-4993-8f78-d20427e7f8dc"
    })
});
var albumBucketName = "uploadfileshubsync"; //BUCKET_NAME
// snippet-end:[s3.JavaScript.photoAlbumExample.configV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.listAlbumsV3]
// A utility function to create HTML
function getHtml(template) {
    return template.join("\n");
}
// Make getHTML function available to the browser
window.getHTML = getHtml;
// List the photo albums that exist in the bucket
var listAlbums = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, htmlTemplate, albums, message, htmlTemplate, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, s3.send(new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName }))];
            case 1:
                data = _a.sent();
                if (data.CommonPrefixes === undefined) {
                    htmlTemplate = [
                        "<p>You don't have any albums. You need to create an album.</p>",
                        "<button onclick=\"createAlbum(prompt('Enter album name:'))\">",
                        "Create new album",
                        "</button>",
                    ];
                    document.getElementById("app").innerHTML = htmlTemplate;
                }
                else {
                    albums = data.CommonPrefixes.map(function (commonPrefix) {
                        var prefix = commonPrefix.Prefix;
                        var albumName = decodeURIComponent(prefix.replace("/", ""));
                        return getHtml([
                            "<li>",
                            "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
                            "<span onclick=\"viewAlbum('" + albumName + "')\">",
                            albumName,
                            "</span>",
                            "</li>",
                        ]);
                    });
                    message = albums.length
                        ? getHtml([
                            "<p>Click an album name to view it.</p>",
                            "<p>Click the X to delete the album.</p>",
                        ])
                        : "<p>You do not have any albums. You need to create an album";
                    htmlTemplate = [
                        "<h2>Albums</h2>",
                        message,
                        "<ul>",
                        getHtml(albums),
                        "</ul>",
                        "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
                        "Create new Album",
                        "</button>",
                    ];
                    document.getElementById("app").innerHTML = getHtml(htmlTemplate);
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, alert("There was an error listing your albums: " + err_1.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Make listAlbums function available to the browser
window.listAlbums = listAlbums;
// snippet-end:[s3.JavaScript.photoAlbumExample.listAlbumsV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.createAlbumV3]
// Create an album in the bucket
var createAlbum = function (albumName) { return __awaiter(void 0, void 0, void 0, function () {
    var albumKey, key, params, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                albumName = albumName.trim();
                if (!albumName) {
                    return [2 /*return*/, alert("Album names must contain at least one non-space character.")];
                }
                if (albumName.indexOf("/") !== -1) {
                    return [2 /*return*/, alert("Album names cannot contain slashes.")];
                }
                albumKey = encodeURIComponent(albumName);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                key = albumKey + "/";
                params = { Bucket: albumBucketName, Key: key };
                return [4 /*yield*/, s3.putObject(params)];
            case 2:
                data = _a.sent();
                alert("Successfully created album.");
                viewAlbum(albumName);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, alert("There was an error creating your album: " + err_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Make createAlbum function available to the browser
window.createAlbum = createAlbum;
// snippet-end:[s3.JavaScript.photoAlbumExample.createAlbumV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.viewAlbumV3]
// View the contents of an album
var viewAlbum = function (albumName) { return __awaiter(void 0, void 0, void 0, function () {
    var albumPhotosKey, data, htmlTemplate, href, bucketUrl_1, photos, message, htmlTemplate_1, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                albumPhotosKey = encodeURIComponent(albumName) + "/";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, s3.send(new ListObjectsCommand({
                        Prefix: albumPhotosKey,
                        Bucket: albumBucketName
                    }))];
            case 2:
                data = _a.sent();
                if (data.Contents.length === 1) {
                    htmlTemplate = [
                        "<p>You don't have any photos in this album. You need to add photos.</p>",
                        '<input id="photoupload" type="file" accept="image/*">',
                        '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
                        "Add photo",
                        "</button>",
                        '<button onclick="listAlbums()">',
                        "Back to albums",
                        "</button>",
                    ];
                    document.getElementById("app").innerHTML = getHtml(htmlTemplate);
                }
                else {
                    console.log(data);
                    href = "https://s3." + region + ".amazonaws.com/";
                    bucketUrl_1 = href + albumBucketName + "/";
                    photos = data.Contents.map(function (photo) {
                        var photoKey = photo.Key;
                        console.log(photo.Key);
                        var photoUrl = bucketUrl_1 + encodeURIComponent(photoKey);
                        return getHtml([
                            "<span>",
                            "<div>",
                            '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
                            "</div>",
                            "<div>",
                            "<span onclick=\"deletePhoto('" +
                                albumName +
                                "','" +
                                photoKey +
                                "')\">",
                            "X",
                            "</span>",
                            "<span>",
                            photoKey.replace(albumPhotosKey, ""),
                            "</span>",
                            "</div>",
                            "</span>",
                        ]);
                    });
                    message = photos.length
                        ? "<p>Click  the X to delete the photo</p>"
                        : "<p>You don't have any photos in this album. You need to add photos.</p>";
                    htmlTemplate_1 = [
                        "<h2>",
                        "Album: " + albumName,
                        "</h2>",
                        message,
                        "<div>",
                        getHtml(photos),
                        "</div>",
                        '<input id="photoupload" type="file" accept="image/*">',
                        '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
                        "Add photo",
                        "</button>",
                        '<button onclick="listAlbums()">',
                        "Back to albums",
                        "</button>",
                    ];
                    document.getElementById("app").innerHTML = getHtml(htmlTemplate_1);
                    document.getElementsByTagName("img")[0].remove();
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, alert("There was an error viewing your album: " + err_3.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Make viewAlbum function available to the browser
window.viewAlbum = viewAlbum;
// snippet-end:[s3.JavaScript.photoAlbumExample.viewAlbumV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.addPhotoV3]
// Add a photo to an album
var addPhoto = function (albumName) { return __awaiter(void 0, void 0, void 0, function () {
    var files, albumPhotosKey, data, file, fileName, photoKey, uploadParams, data_1, err_4, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                files = document.getElementById("photoupload").files;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                albumPhotosKey = encodeURIComponent(albumName) + "/";
                return [4 /*yield*/, s3.send(new ListObjectsCommand({
                        Prefix: albumPhotosKey,
                        Bucket: albumBucketName
                    }))];
            case 2:
                data = _a.sent();
                file = files[0];
                fileName = file.name;
                photoKey = albumPhotosKey + fileName;
                uploadParams = {
                    Bucket: albumBucketName,
                    Key: photoKey,
                    Body: file
                };
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, s3.putObject(uploadParams)];
            case 4:
                data_1 = _a.sent();
                alert("Successfully uploaded photo.");
                viewAlbum(albumName);
                return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                return [2 /*return*/, alert("There was an error uploading your photo: ", err_4.message)];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_5 = _a.sent();
                if (!files.length) {
                    return [2 /*return*/, alert("Choose a file to upload first.")];
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// Make addPhoto function available to the browser
window.addPhoto = addPhoto;
// snippet-end:[s3.JavaScript.photoAlbumExample.addPhotoV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.deletePhotoV3]
// Delete a photo from an album
var deletePhoto = function (albumName, photoKey) { return __awaiter(void 0, void 0, void 0, function () {
    var params, data, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(photoKey);
                params = { Key: photoKey, Bucket: albumBucketName };
                return [4 /*yield*/, s3.deleteObject(params)];
            case 1:
                data = _a.sent();
                console.log("Successfully deleted photo.");
                viewAlbum(albumName);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, alert("There was an error deleting your photo: ", err_6.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Make deletePhoto function available to the browser
window.deletePhoto = deletePhoto;
// snippet-end:[s3.JavaScript.photoAlbumExample.deletePhotoV3]
// snippet-start:[s3.JavaScript.photoAlbumExample.deleteAlbumV3]
// Delete an album from the bucket
var deleteAlbum = function (albumName) { return __awaiter(void 0, void 0, void 0, function () {
    var albumKey, params, data, objects, params_1, data_2, err_7, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                albumKey = encodeURIComponent(albumName) + "/";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                params = { Bucket: albumBucketName, Prefix: albumKey };
                return [4 /*yield*/, s3.listObjects(params)];
            case 2:
                data = _a.sent();
                objects = data.Contents.map(function (object) {
                    return { Key: object.Key };
                });
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                params_1 = {
                    Bucket: albumBucketName,
                    Delete: { Objects: objects },
                    Quiet: true
                };
                return [4 /*yield*/, s3.deleteObjects(params_1)];
            case 4:
                data_2 = _a.sent();
                listAlbums();
                return [2 /*return*/, alert("Successfully deleted album.")];
            case 5:
                err_7 = _a.sent();
                return [2 /*return*/, alert("There was an error deleting your album: ", err_7.message)];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_8 = _a.sent();
                return [2 /*return*/, alert("There was an error deleting your album1: ", err_8.message)];
            case 8: return [2 /*return*/];
        }
    });
}); };
// Make deleteAlbum function available to the browser
window.deleteAlbum = deleteAlbum;
module.exports = {
    listAlbums: listAlbums,
    createAlbum: createAlbum,
    viewAlbum: viewAlbum,
    addPhoto: addPhoto,
    deletePhoto: deletePhoto,
    deleteAlbum: deleteAlbum
};
