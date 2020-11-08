$(function() {
    //選擇時間
    var this_week = '';
    var this_week_start_date = '';
    var this_week_end_date = '';
    var start_date_year = '';
    var start_date_month = '';
    var start_date_day = '';
    var end_date_year = '';
    var end_date_month = '';
    var end_date_day = '';

    $('.btn-book').click(function () {
        $('#memberTimeBook .day-schedule-submit').text('立即預約');
        $('#memberTimeBook').modal('show');

        // ## Section A Start - 取得可選擇的時間(包含去除被限制的時間)
        // 此target的意思：某帳號/對象的ID，此Section是要，透過某帳號/對象在資料庫內查詢到屬於此對象的「可被選擇的時間」，且是「符合下方規則的格式的時間」。
        targetId = 1;
        $.ajax({
            url: '/myAccount/getTargetFreeTime',
            method:'post',
            data:{
                'target_id' : targetId, //暫定此對象ID為1
                'this_week' : $('#memberTimeBook input[name="this_week"]').val() //假設以2020/11/8舉例，那因為是今年第46週，所以值是46。
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        })
            .done(function(d) {
                var dataObj = '';
                /**
                 * d dataType : string
                 *
                 *
                 * empty
                 * d = [
                 *
                 * ];
                 *
                 * not empty
                 * d = {
                 * "0":{},
                 * "1":{},
                 * "2":{},
                 * "3":{"0":{"0":"08:00","1":"22:30"}},
                 * "4":{"0":{"0":"08:00","1":"11:00"},"1":{"0":"14:30","1":"16:30"}}
                 * "5":{},
                 * "6":{}
                 * }
                 * 此範例代表，星期三的 08:00~22:30、星期四的 08:00~11:00 & 14:30~16:30為可選擇的時間
                **/

                if(d.length){
                    dataObj = JSON.parse(d);
                }

                // 啟動選時間外掛
                $("#memberTimeBook #daySchedule").dayScheduleSelector();

                // 處理目前第一階段取得的時間
                $("#memberTimeBook #daySchedule").data('artsy.dayScheduleSelector').deserialize(dataObj);

                // 加無法選擇並停掉 dayScheduleSelector 的選擇功能
                $("#memberTimeBook #daySchedule").find('.time-slot').attr('data-disabled', 'disabled').click(function(event) {
                    return false;
                });

                // ## Section B Start - 用來限制哪些時間不能用
                $.ajax({
                    url: '/getAllNeedToBeDisabledTime',
                    method:'post',
                    data:{
                        'target_id': $('#memberTimeBook .day-schedule input[name="target_id"]').val(),
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                })
                    .done(function(data) {
                        /**
                         * d dataType = array
                         * 範例值
                         * data = [
                         *   [
                         *    'week' : '46',
                         *    'day' : '4',
                         *    'time' : '14:30',
                         *   ],
                         * ]
                        */
                        // 這邊可根據想要做的前端限制來處理，常用的方法或是變數，如迴圈內所提到的。
                        for(let i=0;i<data.length;i++){
                            $("body #memberTimeBook .time-slot").each(function(index, slot){
                                // $('#memberTimeBook input[name="this_week"]').val()
                                // $(slot).data('time') $(slot).data('day')
                                // new_index = index + 1;
                                // $("body #memberTimeBook .time-slot")[new_index].removeAttribute('data-selected');
                                // $("body #memberTimeBook .time-slot")[new_index].setAttribute('data-selected', 'disabled');
                            })
                        }


                        // ## Section C Start - 再次限制，要做限制就一直包ajax做下去，而下方的「Section D 整理時間點」以及「Section E 重新顯示日期」
                        // 都是在「最後一個限制」裡成功收到回傳資料時，去製作，
                        // 目前此範例為只有一個限制，也就是Section C 這個再次限制不存在。
                        // nothing to do
                        // ## Section C End


                        // ## Section D Start - 整理出哪些時間點可被選擇
                        $("#memberTimeBook #daySchedule").find('.time-slot[data-selected=selected]').click(function(event) {
                            $('.time-slot').removeClass('js-stdSelected');
                            if (!$(this).hasClass('js-stdSelected') && $(this).attr('data-disabled') != 'disabled') {
                                $(this).addClass('js-stdSelected');
                            }
                        });
                        // ## Section D End


                        // ## Section E Start - 重新顯示新的日期
                        this_week = parseInt($('#memberTimeBook input[name="this_week"]').val());
                        $('#memberTimeBook input[name="this_week"]').val(this_week);

                        //start_date
                        this_week_start_date = new Date($('#memberTimeBook input[name="this_week_start_date"]').val());
                        this_week_start_date.setDate(this_week_start_date.getDate());
                        start_date_year = this_week_start_date.getFullYear();
                        start_date_month = this_week_start_date.getMonth()+1;
                        start_date_day = this_week_start_date.getDate();
                        if(start_date_month.toString().length==1){
                            start_date_month = ("0" + start_date_month).slice(-2);
                        }
                        if(start_date_day.toString().length==1){
                            start_date_day = ("0" + start_date_day).slice(-2);
                        }
                        $('#memberTimeBook input[name="this_week_start_date"]').val(this_week_start_date);
                        $('#memberTimeBook .this_week_start_date').text(start_date_year+'/'+start_date_month+'/'+start_date_day);

                        //end_date
                        this_week_end_date = new Date($('#memberTimeBook input[name="this_week_end_date"]').val());
                        this_week_end_date.setDate(this_week_end_date.getDate());
                        end_date_year = this_week_end_date.getFullYear();
                        end_date_month = this_week_end_date.getMonth()+1;
                        end_date_day = this_week_end_date.getDate();
                        if(end_date_month.toString().length==1){
                            end_date_month = ("0" + end_date_month).slice(-2);
                        }
                        if(end_date_day.toString().length==1){
                            end_date_day = ("0" + end_date_day).slice(-2);
                        }
                        $('#memberTimeBook input[name="this_week_end_date"]').val(this_week_end_date);
                        $('#memberTimeBook .this_week_end_date').text(end_date_month+'/'+end_date_day);

                        $('#memberTimeBook .number-under-chinese').remove();
                        $.each($('#memberTimeBook .schedule-days-time'), function (key ,value) {
                            if(key==0){
                                this_week_start_date.setDate(this_week_start_date.getDate());
                            }else{
                                this_week_start_date.setDate(this_week_start_date.getDate()+1);
                            }
                            this_week_start_date_day = this_week_start_date.getDate();
                            div_html = $('<div class="number-under-chinese">'+(this_week_start_date_day)+'</div>');
                            div_html.insertBefore(value);
                        });
                        // ## Section E End
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                    });

                //## Section B End


                // ## Section F - 最後送出資料的地方
                $("#memberTimeBook #dayScheduleBtn").click(function(event) {

                    if(!$('.js-stdSelected').length){
                        alert('未選擇時間');
                        return false;
                    }

                    //預防重複點擊
                    $(this).attr('disabled', 'disabled');

                    var stdDay = $('#memberTimeBook .time-slot.js-stdSelected').eq(0).data('day').toString();
                    var stdTime = $('#memberTimeBook .time-slot.js-stdSelected').eq(0).data('time');
                    var stdDayTime = {
                        "day": stdDay,
                        "time": stdTime
                    }

                    let start_time_str = stdDayTime['time'];
                    let end_time_str = stdDayTime['time'];
                    let end_time_str_minute = end_time_str.split(':')[1];
                    let end_time_str_hour = end_time_str.split(':')[0];
                    end_time_str_minute = parseInt(end_time_str_minute) + 50;
                    if(end_time_str_minute >=60){
                        end_time_str_minute = parseInt(end_time_str_minute) -60;
                        end_time_str_hour = parseInt(end_time_str_hour) + 1;
                    }

                    this_week = parseInt($('#memberTimeBook input[name="this_week"]').val())+parseInt(1);
                    $('#memberTimeBook input[name="this_week"]').val(this_week);
                    this_week_start_date = new Date($('#memberTimeBook input[name="this_week_start_date"]').val());
                    this_week_start_date.setDate(parseInt(this_week_start_date.getDate())+parseInt(stdDay));
                    start_date_year = this_week_start_date.getFullYear();
                    start_date_month = this_week_start_date.getMonth()+1;
                    start_date_day = this_week_start_date.getDate();
                    if(start_date_month.toString().length==1){
                        start_date_month = ("0" + start_date_month).slice(-2);
                    }
                    if(start_date_day.toString().length==1){
                        start_date_day = ("0" + start_date_day).slice(-2);
                    }

                    let output = start_date_year + '/' +
                          start_date_month + '/' +
                          start_date_day + ' ' + start_time_str;
                    output += '~' + end_time_str_hour + ':' + end_time_str_minute;
                    $('#memberTimeBook .day-schedule input[name="resultDate"]').val(output);

                    /** 範例的結果
                     * $('#memberTimeBook .day-schedule input[name="resultDate"]').val()
                     * $('#memberTimeBook .day-schedule input[name="resultDate"]').val() dataType: string
                     * 2020/11/12 14:30~15:20
                    */
                    $.ajax({
                        url :location.origin + '/yourResultUrl',
                        method: 'post',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        data: {
                            'resultDate': $('#memberTimeBook .day-schedule input[name="resultDate"]').val(),
                            'resultColumn': 'resultValue',
                        }, success(msg){

                        }, fail(msg){

                        }
                    });

                });
                // ## Section F End
            })
            .fail(function(jqXHR, textStatus, errorThrown ) {
                console.log(textStatus);
            });
    });

    $(document).on('click', '#memberTimeBook .btn_last_week' , function (e) {
        e.preventDefault();
        e.stopPropagation();
        this_week = parseInt($('#memberTimeBook input[name="this_week"]').val())-parseInt(1);
        $('#memberTimeBook input[name="this_week"]').val(this_week);
        // ## Section E - 重新顯示新的日期 {看上面}
        // 跟上方的差別就是差在 .setDate()的時候，要「-7」

        // ## Section A - 取得可選擇的時間(包含去除被限制的時間) {請看上方}
    });

    $(document).on('click', '#memberTimeBook .btn_next_week' , function (e) {
        e.preventDefault();
        e.stopPropagation();
        this_week = parseInt($('#memberTimeBook input[name="this_week"]').val())+parseInt(1);
        $('#memberTimeBook input[name="this_week"]').val(this_week);
        // ## Section E - 重新顯示新的日期 {看上面}
        // 跟上方的差別就是差在 .setDate()的時候，要「+7」

        // ## Section A - 取得可選擇的時間(包含去除被限制的時間) {請看上方}
    });

});
