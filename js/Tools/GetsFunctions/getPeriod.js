function getPeriod(activity, quiz_list) {

    let period = {
        start : 0,
        end : 0
    }

    quiz_list.forEach((e) => {
        if(e.name == activity) {
            period = {
                start : e.t_open,
                end : e.t_close
            }
        }
    });

    return period

}

export default getPeriod