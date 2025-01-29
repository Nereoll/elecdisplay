// preload.js
const { contextBridge } = require('electron');
const si = require('systeminformation');
// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

// Expose an API to get system stats
contextBridge.exposeInMainWorld('systemAPI', {
    getStats: async () => {
      try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const os = await si.osInfo();
        const users = await si.users();
        const cpuTemperature = await si.cpuTemperature();
        const graphics = await si.graphics();
        const uptimesec=await si.time().uptime;
        const diskInfo = await si.fsSize();
  
  
        return {
            cpuLoad: cpu.currentLoad.toFixed(2),
            totalMem: (mem.total / (1024 ** 3)).toFixed(2),
            freeMem: (mem.available / (1024 ** 3)).toFixed(2),
            osName: os.distro,
            averageCpuTemp: cpuTemperature.main || 'N/A',
            uptime: uptimesec, // Get uptime in seconds
            username: users[0]?.user || 'N/A',
            graphics: graphics.controllers[1].model || 'N/A',
            freeDiskSpace: (diskInfo[0]?.available / (1024**3)).toFixed(2) || 'N/A',
            totalDiskSpace:(diskInfo[0]?.size / (1024**3)).toFixed(2) || 'N/A',
        };
      } catch (err) {
        console.error('Error fetching stats:', err);
        return {
            cpuLoad: 'N/A',
            totalMem: 'N/A',
            freeMem: 'N/A',
            osName: 'N/A',
            averageCpuTemp: 'N/A',
            uptime: 'N/A',
            username: 'N/A',
            graphics: 'N/A',
            totalDiskSpace: 'N/A',
            freeDiskSpace: 'N/A',
        };
      }
    },
  });
  

