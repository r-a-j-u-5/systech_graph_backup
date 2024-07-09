"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAuthorizationHeader = void 0;
const GenerateAuthorizationHeader = (user, password) => {
    var token = user + ":" + password;
    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    var hash = btoa(token);
    return "Basic " + hash;
};
exports.GenerateAuthorizationHeader = GenerateAuthorizationHeader;
