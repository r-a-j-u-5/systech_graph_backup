export const GenerateAuthorizationHeader = (user: string, password: string) => {
  var token = user + ":" + password;

  // Should i be encoding this value????? does it matter???
  // Base64 Encoding -> btoa
  var hash = btoa(token);

  return "Basic " + hash;
};
