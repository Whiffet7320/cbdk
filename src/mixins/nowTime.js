import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default function () {
    return {
        data() {
            return {
                nowTime: new Date(),
                timer: null,
            }
        },
        mounted() {
            let _this = this;
            this.getNowTime();
            this.timer = setInterval(() => {
                _this.getNowTime();
            }, 1000);
        },
        methods: {
            getNowTime() {
                this.nowTime = new Date();
                this.nowTime = moment(this.nowTime).format("YYYY-MM-DD HH:mm:ss");
            },
        }
    }
}