
const signale = require('signale');
export let addlog=(msg)=>{
    signale.complete({prefix: '[task]', message: [`time:${new Date()}`,msg, ], suffix: '(@klaussinani)'});
}