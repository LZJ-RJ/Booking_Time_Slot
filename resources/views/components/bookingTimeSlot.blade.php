<?php
$now_date = new DateTime('now');
$now_date->modify('+8 hours');
$now_year = $now_date->format('Y');
$now_week = $now_date->format('W');
$now_day =$now_date->format('w');
if($now_date->format('w') == 0){
    $now_week +=1;
}
$week_date = new DateTime('now');
$week_date->setISODate($now_year, $now_week);
$week_date->modify('-1 days'); //因為原本是從星期一到星期日，但是我們要使用到從星期日到星期一。

$this_week_start_date =$week_date->format('Y/m/d');
$week_date->modify('+6 days');
$this_week_end_date = $week_date->format('Y/m/d');
?>
<div class="d-flex flex-wrap booking-time-header">
  <p class="font-weight-bold">＊備註：每個區間的間隔為30分鐘。<i class="fas fa-question-circle ml-2" data-toggle="tooltip" data-placement="top" title="＊備註：每個區間的間隔為30分鐘。"  aria-describedby="tooltip533280"></i></p>
</div>

<div class="d-flex flex-wrap bg-yellow align-items-center px-4 py-2 mb-4">
   <h4 class="text-white m-0 col-12 col-md-6">上課時段</h4>
    <input type="hidden" name="now_time" value="{{$now_date->format('H:i')}}">
    <input type="hidden" name="now_day" value="{{$now_day}}">
    <input type="hidden" name="now_week" value="{{$now_week}}">
    <input type="hidden" name="this_week" value="{{$now_week}}">
    <input type="hidden" name="this_week_start_date" value="{{$this_week_start_date}}">
    <input type="hidden" name="this_week_end_date" value="{{$this_week_end_date}}">
    <button class="btn_last_week ml-2 ml-md-auto text-white mr-2" style="background: transparent;
    border: solid 1px white;"><i class="fas fa-chevron-left"></i></button>
    <button class="btn_next_week text-white mr-2" style="background: transparent;
    border: solid 1px white;"><i class="fas fa-chevron-right"></i></button>
    <h5 class="this_week_start_date text-white m-0 font-weight-bold">{{$this_week_start_date}}</h5><span class="text-white">-</span><h5 class="this_week_end_date text-white m-0 font-weight-bold">{{$week_date->format('m-d')}}</h5>
</div>
<div class="day-schedule">
    <div id="daySchedule"></div>
    <button class="day-schedule-ctrl">
        <svg class="svg_icon" width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.83594 10.1328C9.1875 10.4844 9.77344 10.4844 10.125 10.1328L17.7422 2.55469C18.0937 2.16406 18.0937 1.57812 17.7422 1.22656L16.8437 0.328125C16.4922 -0.0234379 15.9062 -0.0234379 15.5156 0.328125L9.5 6.34375L3.44531 0.328124C3.05469 -0.0234385 2.46875 -0.0234385 2.11719 0.328124L1.21875 1.22656C0.867187 1.57812 0.867187 2.16406 1.21875 2.55469L8.83594 10.1328Z" fill="#4ABDAC"/>
        </svg>
    </button>
</div>
<button class="day-schedule-submit btn btn-md btn-secondary float-right" id="dayScheduleBtn" type="button">確認</button>



