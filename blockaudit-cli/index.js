#!/user/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const { analyzeContract } = require('./src/ai-prompt');
const fs = require('fs');
const path = require('path');
