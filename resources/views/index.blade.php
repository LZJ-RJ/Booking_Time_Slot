<?php
$now_date = new DateTime('now');
$now_date->modify('+8 hours');
?>

<!--scripts and styles-->
<link rel="stylesheet" href="{{ asset('css/bookingTime.css') }}">
<script src="{{ asset('js/lib/daySchedule.js') }}"></script>
<script src="{{ asset('js/lib/bookingTime.js') }}"></script>
<script src="{{ asset('js/selectTime.js') }}"></script>

{{--trigger button--}}
<button class="btn-book">預約按鈕</button>

{{--popup lightbox--}}
<div id="memberTimeBook" class="modal pop-dialog" tabindex="-1" role="dialog" aria-labelledby="memberTimeBook" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p>預約時間</p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div>
                    @include('components.bookingTimeSlot')
                    <div class="d-flex">
                        <div class="bg-yellow mr-2" style="width:25px; height:25px;"></div>
                        <p class="m-0 font-weight-bold">預約時間</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>