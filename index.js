const dns = require('dns');
let version = '0.1.0';

let args = process.argv;
args.shift();
args.shift();

process.stdout.write('DNS Tools v'+version+'\n');

if(args.length == 0){
    process.stdout.write('=================================\n');

    let servers = dns.getServers();
    process.stdout.write('Servers In Use:\n'+servers.join('\n')+'\n');

    process.stdout.write('=================================\n');
    process.stdout.write('Help:\n');
    process.stdout.write('=================================\n');
}

if(args[0] === '--resolve' || args[0] === '-r'){
    process.stdout.write('=================================\nResolve: '+args[1]+'\n');

    dns.resolve(args[1], 'A', ( err, records ) => {
        if(err && err.code !== 'ENODATA'){
            process.stderr.write(err+'\n\n');

            return;
        }

        if(err && err.code === 'ENODATA')
            return;
        
        process.stdout.write('Type: A, Addresses: '+records.join(', ')+'\n');

        dns.resolve(args[1], 'AAAA', ( err, records ) => {
            if(err && err.code !== 'ENODATA'){
                process.stderr.write(err+'\n\n');
    
                return;
            }
    
            if(err && err.code === 'ENODATA')
                return;
            
            process.stdout.write('Type: AAAA, Addresses: '+records.join(', ')+'\n');

            dns.resolve(args[1], 'CNAME', ( err, records ) => {
                if(err && err.code !== 'ENODATA'){
                    process.stderr.write(err+'\n\n');
        
                    return;
                }
        
                if(err && err.code === 'ENODATA')
                    return process.stdout.write('=================================\n');
        
                process.stdout.write('Type: CNAME, Addresses: '+records.join(', ')+'\n');
                process.stdout.write('=================================\n');
            })
        })
    })
}

if(args[0] === '--nameservers' || args[0] === '-ns'){
    process.stdout.write('=================================\nResolve: '+args[1]+'\n');

    dns.resolve(args[1], 'NS', ( err, records ) => {
        if(err && err.code !== 'ENODATA'){
            process.stderr.write(err+'\n\n');

            return;
        }

        if(err && err.code === 'ENODATA')
            return process.stdout.write('No Data\n=================================\n');

        process.stdout.write('Type: NAMESERVERS, Addresses: '+records.join(', ')+'\n');
        process.stdout.write('=================================\n');
    })
}

if(args[0] === '--text' || args[0] === '-txt'){
    process.stdout.write('=================================\nResolve: '+args[1]+'\n');

    dns.resolve(args[1], 'TXT', ( err, records ) => {
        if(err && err.code !== 'ENODATA'){
            process.stderr.write(err+'\n\n');

            return;
        }

        if(err && err.code === 'ENODATA')
            return process.stdout.write('No Data\n=================================\n');

        process.stdout.write('Type: TXT, Addresses: '+records.join(', ')+'\n');
        process.stdout.write('=================================\n');
    })
}

if(args[0] === '--mail' || args[0] === '-mx'){
    process.stdout.write('=================================\nResolve: '+args[1]+'\n');

    dns.resolve(args[1], 'MX', ( err, records ) => {
        if(err && err.code !== 'ENODATA'){
            process.stderr.write(err+'\n\n');

            return;
        }

        if(err && err.code === 'ENODATA')
            return process.stdout.write('No Data\n=================================\n');

        records.forEach(rec => {
            process.stdout.write('Priority: '+rec.priority+', Hostname: '+rec.exchange+'\n');
        })

        process.stdout.write('=================================\n');
    })
}

if(args[0] === '--reverse' || args[0] === '-rv'){
    process.stdout.write('=================================\nResolve: '+args[1]+'\n');

    dns.reverse(args[1], ( err, hostnames ) => {
        if(err && err.code !== 'ENODATA'){
            process.stderr.write(err+'\n\n');

            return;
        }

        if(err && err.code === 'ENODATA')
            return process.stdout.write('No Data\n=================================\n');

        process.stdout.write('Hosts: '+hostnames.join(', ')+'\n');
        process.stdout.write('=================================\n');
    })
}