const { execSync, exec } = require('child_process');
const { unlinkSync, existsSync, writeFileSync } = require('fs');
const { LOG_FILE, DEBUG_FILE, PORTS_FILE } = require('../../config.cjs');
const { logInFile } = require('../file.cjs');

/**
 * This function execute a command in background and return
 * his process id.
 * It is important to kill the process
 * as it causes resource consumption by zombie processes
 * @param {string} command
 * @param {ExecSyncOptions} options
 * @return {string}
 */
const execBackground = (command, options) => {
  const bgCommand = `${__dirname}/background.sh -c '${command}' ${DEBUG_FILE ? `-o ${LOG_FILE}` : ''}`;
  return execSync(bgCommand, options).toString();
};

/**
 * This function load port used
 * @param {string} port
 */
const loadPort = (port) => {
  if (!port) {
    return;
  }
  if (!existsSync(PORTS_FILE)) {
    writeFileSync(PORTS_FILE, '[]');
  }
  const content = require(PORTS_FILE);
  content.push(port);
  writeFileSync(PORTS_FILE, JSON.stringify(content));
};

/**
 * This function return the command to execute in windows console
 * @param {number} port
 * @return {string}
 */
const getWindowsKillPortCommand = (port) => {
  const isGitBash = process.title === ' ' || (process.env.SHELL && process.env.SHELL.includes('bash'));

  if (isGitBash) {
    return `taskkill //PID $('netstat -ano -p tcp | findstr "${port}" | awk '{printf $NF}'') //F`;
  }

  const isPowershell = !execSync('echo $env:Path').toString().includes('$env:Path');
  const isCMD = !isPowershell;

  if (isPowershell) {
    return `netstat -ano -p tcp | Select-String "${port}" |  %{($_ -split "\\s+")[-1]} | kill`;
  }
  if (isCMD) {
    return `for /f "tokens=3 delims=LISTENING" %F in ('netstat -ano -p tcp ^| findstr "${port}"') do taskkill /PID %~F /F`;
  }

  return '';
};
/**
 * This function kill a PID on a PORT
 * @param {string} port
 * @return {Promise<void>}
 */
const killPidOnPort = (port) => {
  const isWin = process.platform === 'win32';
  const linuxCommand = `kill $(netstat -ltnp 2>/dev/null | grep :${port} | awk '{print $NF}' | awk -F '/' '{print $1}' )`;
  const command = isWin ? getWindowsKillPortCommand(port) : linuxCommand;
  return new Promise((resolve) => {
    if (!port || !command) {
      resolve(null);
    }
    exec(command, (error, stdout, stderr) => {
      if (DEBUG_FILE) {
        logInFile(command);
        if (error) {
          logInFile(error.message);
        }
        if (stdout) {
          logInFile(stdout);
        }
        if (stderr) {
          logInFile(stderr);
        }
      }
      resolve(null);
    });
  });
};
/**
 * This function kill all PID on PORTS
 * @return {Promise<void>}
 */
const killPidsOnPorts = async () => {
  if (!existsSync(PORTS_FILE)) {
    return null;
  }
  const ports = require(PORTS_FILE);
  if (DEBUG_FILE) {
    logInFile(`Killing all these ports: ${ports.join(',')}`);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const port of ports) {
    // eslint-disable-next-line no-await-in-loop
    await killPidOnPort(port);
  }
  unlinkSync(PORTS_FILE);
  if (DEBUG_FILE) {
    logInFile('Killed');
  }
  return null;
};

module.exports = {
  execBackground, loadPort, killPidOnPort, killPidsOnPorts,
};
