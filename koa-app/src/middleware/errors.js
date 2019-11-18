import { addErrorsRecord } from 'S/System/errorController';

// 是否记录错误标记，生产环境置为 true，后期可以加入数据库配置
const label = false;

const listenError = (app) => {
    app.on('error', (err, ctx) => {
        try {
            // 将可能出现的单引号替换为中文全角单引号
            const errStr = String(err).replace(/\'/g, '‘');
            let params = {
                username: 'yh',
                project: 'YLONELY_GROWUP-koa',
                referrer: '',
                event: 'koa-error',
                type: '',
                path: ctx.originalUrl,
                level: 1,
                stack: '',
                message: errStr,
                origin: '',
                useragent: JSON.stringify(ctx.app),
                network: '',
                appversion: ''
            };
            // 请求参数错误
            if (errStr.includes('ValidationError')) {
                params.type = 'ValidationError';
                params.origin = JSON.stringify(err.details);
                // 函数方法错误
            } else if (errStr.includes('TypeError')) {
                params.type = 'TypeError';
                params.stack = err.stack.replace(/\'/g, '‘');;
                // sql 语句错误
            } else if (errStr.includes('SequelizeDatabaseError')) {
                params.type = 'SequelizeDatabaseError';
                params.stack = err.stack.replace(/\'/g, '‘');;
            }
            console.log(params);
            if (label) {
                addErrorsRecord(params);
            }
        } catch (e) {
            ctx.throw(e);
        }
    });
}

export { listenError }