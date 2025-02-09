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
      const cpu = await si.currentLoad().catch(err => console.error("Error fetching CPU Load:", err));
      const mem = await si.mem().catch(err => console.error("Error fetching Memory:", err));
      const os = await si.osInfo().catch(err => console.error("Error fetching OS Info:", err));
      const users = await si.users().catch(err => console.error("Error fetching Users:", err));
      const cpuTemperature = await si.cpuTemperature().catch(err => console.error("Error fetching CPU Temperature:", err));
      const graphics = await si.graphics().catch(err => console.error("Error fetching Graphics:", err));
      const uptimesec = si.time().uptime || 'N/A';
      const diskInfo = await si.fsSize().catch(err => console.error("Error fetching Disk Info:", err));

      return {
          cpuLoad: cpu?.currentLoad?.toFixed(2) || 'N/A',
          totalMem: (mem?.total / (1024 ** 3)).toFixed(2) || 'N/A',
          freeMem: (mem?.available / (1024 ** 3)).toFixed(2) || 'N/A',
          osName: os?.distro || 'N/A',
          averageCpuTemp: cpuTemperature?.main || 'N/A',
          uptime: uptimesec || 'N/A',
          username: users[0]?.user || 'N/A',
          graphics: graphics?.controllers?.[0]?.model || 'N/A',
          freeDiskSpace: (diskInfo?.[0]?.available / (1024**3)).toFixed(2) || 'N/A',
          totalDiskSpace: (diskInfo?.[0]?.size / (1024**3)).toFixed(2) || 'N/A',
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


