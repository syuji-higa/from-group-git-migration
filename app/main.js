'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');
const { exec } = require('child_process');
const { repoDomain, repoUser, destRoot, repoJson } = require('./config.json');
const { log } = require('./utility/log');

const repos = JSON.parse(readFileSync(repoJson).toString());

(async () => {
  for(const repo of repos) {
    const _repoStrs = repo.match(/^git@[^:]+:([^.]+)\/([^.]+)\.git$/);
    if(!_repoStrs) {
      throw new Error(`Not match repository name ${ repo }.`);
    }

    const _oldUserName = _repoStrs[1];
    const _oldRepoName = _repoStrs[2];
    if(!_oldUserName) {
      throw new Error(`Not find group name ${ _oldUserName }.`);
    }
    if(!_oldRepoName) {
      throw new Error(`Not find repository name ${ _oldRepoName }.`);
    }

    const _repoName = `${ _oldUserName }--${ _oldRepoName }`;
    const _repo     = `git@${ repoDomain }:${ repoUser }/${ _repoName }.git`;
    const _dest     = join(destRoot, _repoName);
    const _destGit  = join(_dest, '.git');

    // clone
    log('git clone start', repo);
    await new Promise((resolve) => {
      exec(`git clone --mirror ${ repo } ${ _destGit }`, (err) => {
        if(err) console.error(err);
        resolve();
      });
    });
    log('git clone finish', repo);

    // remote change
    log('git remote change start', repo);
    await new Promise((resolve) => {
      exec(`git remote set-url origin ${ _repo }`, { cwd: _dest }, (err) => {
        if(err) console.error(err);
        resolve();
      });
    });
    log('git remote change finish', repo);

    // push
    log('git push start', _repo);
    await new Promise((resolve) => {
      exec(`git push --mirror ${ _repo }`, { cwd: _destGit }, (err) => {
        if(err) console.error(err);
        resolve();
      });
    });
    log('git push finish', _repo);
  }
})();
