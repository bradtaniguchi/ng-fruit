module.exports = {
  name: 'fruit-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fruit-client/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
