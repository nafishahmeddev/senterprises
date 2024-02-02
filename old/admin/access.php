<? include <<<TAG
__header.php
TAG;
?>
<div class="content" id="access_list_container">

</div>

<div class="rightbar">
</div>

<script>

    /////
    function get_checked_ids() {
        let ids = [];
        __(".table tr").each(function () {
            let checkbox = __("input[type=checkbox]", this);
            if(checkbox.checked()){
                ids.push(__(this).attr("data-id"))
            }
        });
        return ids;
    }
    /*******/
    function go_to_page(page, record=true) {
        access_fetch(page, record);
    }
    function access_fetch(page_no, record) {
        const fd = new FormData;
        fd.append("access_fetch", "OK");
        fd.append("page", page_no);
        fd.append("keyword", __("#keyword_selector").val());
        const progress_alert = new Toast("Please wait...");
        __ajax({
            url: "__access_ajax.php",
            data: fd,
            method: "POST",
            progress:function(e){
                console.log(e);
            },
            start: function () {
                progress_alert.show();
            },
            end: function () {
                progress_alert.destroy();
            },
            success: function (e) {
                let response = e;
                __("#access_list_container").html(response);

                initiate_listener();
                if(record) {
                    update_url(page_no, response);
                }

            }

        })
    }
    /******/
    function access_view(access_id) {
        const fd = new FormData;
        fd.append("access_view", access_id);
        __ajax({
            url: "__access_ajax.php",
            data: fd,
            method: "POST",
            start: function () {
                __(".rightbar").addClass("busy");
            },
            end: function () {
                __(".rightbar").removeClass("busy");
            },
            success: function (e) {
                __(".rightbar").html(e);

            }
        });
    }
    function access_delete() {
        const fd = new FormData;
        let ids = get_checked_ids();
        ids.forEach(function (id) {
            fd.append("access_delete[]", id);
        });
        const progress_alert = new Toast("Please wait...");
        __ask({
            title: "Are you sure?",
            content: "Want to delete the access details",
            allow: function () {
                new Ajax({
                    url: "__access_ajax.php",
                    data: fd,
                    method: "POST",
                    start: function () {
                        progress_alert.show();
                    },

                    success: function (e) {
                        var response = JSON.parse(e);
                        if (response.error !== true) {
                            window.location.href = "";
                        }
                        progress_alert.setMessage(response.message)
                    },
                    end: function () {
                        progress_alert.destroy(Toast.Length.Long);
                    }
                })
            }
        });
    }
    function access_insert_form() {
        const fd = new FormData;
        fd.append("access_insert_form", "OK");
        __ajax({
            url: "__access_ajax.php",
            data: fd,
            method: "POST",
            start: function () {
                __(".rightbar").addClass("busy");
            },
            end: function () {
                __(".rightbar").removeClass("busy");
            },
            success: function (e) {
                __(".rightbar").html(e);
                let insert_form = __("#insert_form");
                insert_form.submit(function (e) {
                    const fd = insert_form.serialize("fd");
                    const progress_alert = new Toast("Please wait while uploading file");
                    fd.append("access_insert","OK");
                    e.preventDefault();
                    const _ajax = new Ajax({
                        url: "__access_ajax.php?access_insert=OK",
                        data: fd,
                        method: "POST",
                        content_type: "application/json",
                        start: function () {
                            progress_alert.show();
                        },
                        success: function (e) {
                            var response = JSON.parse(e);
                            progress_alert.setMessage(response.message);
                            if (response.error === true) {
                                progress_alert.setBackground(Color.Error);
                            } else {
                                progress_alert.setBackground(Color.Success);
                            }

                            access_view(response.access_id);
                        },
                        end: function () {
                            progress_alert.destroy(Toast.Length.Long);
                        }
                    });

                });
            }
        });
    }
    function access_edit_form_submit() {
        const progress_alert = new Toast("Please wait...");
        const fd = __("#access_edit_form").serialize("fd");
        fd.append("access_edit", "OK");

        __ask({
            title: "Are you sure?",
            content: "Want to edit the access details.",
            allow: function () {
                new Ajax({
                    url: "__access_ajax.php",
                    data: fd,
                    method: "POST",
                    start: function () {
                        progress_alert.show();
                    },
                    success: function (e) {
                        var response = {error: true, message: "Sorry! invalid response from server."};
                        try {
                            response = JSON.parse(e);
                            progress_alert.setBackground(Color.Success)
                        } catch (e) {
                            progress_alert.setBackground(Color.Error)
                        }
                        progress_alert.setMessage(response.message);

                        if (response.error === false) {
                            window.location.href = "";
                            access_view(response.access_id);
                            access_fetch(1, true);
                        }
                    },
                    error: function () {
                        progress_alert.setMessage("Ops! Something went wrong");
                        progress_alert.setBackground(Color.Error);
                    },
                    end: function () {
                        progress_alert.destroy(Toast.Length.Long);
                    }
                })
            }
        });

    }


    /*******/
    function update_url(page_no, response) {
        if (history.pushState) {
            window.history.pushState(response, "Page Title", "?keyword="+__("#keyword_selector").val()+"&page_no=" + page_no);
        }
    }

    function initiate_listener(){
        __(".table tr").each(function () {
            let row = this;
            __("input[type=checkbox]", this).change(function () {
                if(__(this).checked()===true){
                    __(row).addClass("checked");
                } else {
                    __(row).removeClass("checked");
                }
            })
        });
        __("#select_all_checkbox").change(function () {

            let select_all_checkbox = this;
            __(".table tr").each(function () {
                let row = this;
                switch (__(select_all_checkbox).checked()) {
                    case true:
                        __(row).addClass("checked");
                        __("input[type=checkbox]", this).checked(true);
                        return;
                    case false:
                        __(row).removeClass("checked");
                        __("input[type=checkbox]", this).checked(false);
                        return;

                }
            });
            get_checked_ids();
        });
        __(".data-row").each(function () {
            let row = this;
            __("td:not(:first-child)",this).each(function () {
                __(this).click(function () {
                    access_view(__(row).attr("data-id"));
                })
            })
        });
    }

    window.onload = function () {
        access_insert_form();
        access_fetch(parseInt(<? echo intval($_OS->_get("page_no")==""?1:$_OS->_get("page_no")) ?>));
    };
    window.onpopstate = function(e){
        if(e.state){
            __("#access_list_container").html(e.state);
            initiate_listener();
        }
    };
</script>
<? include <<<TAG
__footer.php
TAG;
?>




