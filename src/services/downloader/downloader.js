import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';

export const Downloader = data => {
  const {downloadLink, downloadPath, fileName} = data;
  let date = new Date();
  const file_URL = downloadLink;
  let ext = /[.]/.exec(file_URL) ? /[^.]+$/.exec(file_URL) : undefined;
  ext = '.' + ext[0];

  const {config, fs} = RNFetchBlob;

  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        downloadPath +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
    },
  };
  return config(options)
    .fetch('GET', file_URL)
    .progress({interval: 2}, (received, total) => {
      console.log('progress', (received / total) * 100);
    })
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res, null, 2));
      alert(ext + ' file Downloaded Successfully.');
      console.log('download success');
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export const DownloadeUnzip = data => {
  const {downloadLink, downloadPath, fileName} = data;
  let date = new Date();
  const file_URL = downloadLink;
  let ext = /[.]/.exec(file_URL) ? /[^.]+$/.exec(file_URL) : undefined;
  ext = '.' + ext[0];

  const {config, fs} = RNFetchBlob;

  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        downloadPath +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
    },
  };
  config(options)
    .fetch('GET', file_URL)
    .progress({interval: 2}, (received, total) => {
      console.log('progress', (received / total) * 100);
    })
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res, null, 2));
      alert(ext + ' file Downloaded Successfully.');
      console.log('download success');
    });
};
