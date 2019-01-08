import Mixin from './mixin';
import Logger from './logger';
import Listenler from './listenler';
import Emitter from './emitter';
import SocketIO from 'socket.io-client';

export default class VueSocketIO {

    /**
     * lets take all resource
     * @param io
     * @param vuex
     * @param debug
     */
    constructor({connection, vuex, debug, params}){

        Logger.debug = debug;
        this.io = this.connect(connection, params);
        this.emitter = new Emitter(vuex);
        this.listener = new Listenler(this.io, this.emitter);

    }

    /**
     * Vuejs entrypoint
     * @param Vue
     */
    install(Vue){

        Vue.prototype.$socket = this.io;
        Vue.prototype.$vueSocketIo = this;
        Vue.mixin(Mixin);

        Logger.info('Vue-Socket.io plugin enabled');

    }


    /**
     * registering socketio instance
     * @param connection
     */
    connect(connection, params){

        if(connection && typeof connection === 'object'){

            Logger.info('Received socket.io-client instance');

            return connection;

        } else if(typeof connection === 'string'){

            Logger.info('Received connection string');

            return this.io = SocketIO(connection, params);

        } else {

            throw new Error('Unsupported connection type');

        }

    }

}
