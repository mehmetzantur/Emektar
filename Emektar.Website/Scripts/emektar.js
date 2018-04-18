// => GENERAL
var _itemIsActive = true;
var urlPath = window.location.pathname.split('/');
// <= GENERAL

// => READY
$(document).ready(function () {

    {
        
        

        // => User Buttons

        $("#user_btnLogin").click(function () {
            User.Login('#user_loginName', '#user_loginPassword');
        });
        

        // <= User Buttons




        // => Case
        switch (urlPath[2]) {


            // => Case/Home
            case Util.cHome:
                User.SessionTimeout();
                User.GetUser();
                break;
            // <= Case/Home





            // => Case/Account
            case Util.cAccount:

                break;
            // <= Case/Account






            // => Case/Department
            case Util.cDepartment:
                $("#liMenuTanimlamalar").attr('class', 'treeview active');
                $("#aMenuDepartment").attr('class', 'aMenuSelected');

                $("[name='department_cbIsActive']").bootstrapSwitch({
                    onText: 'Aktif',
                    offText: 'Pasif ',
                    labelText: '',
                    labelWidth: 10,
                    handleWidth: 50,
                    onColor: 'success',
                    offColor: 'danger',

                    onSwitchChange: function (event, state) {
                        //$(this).bootstrapSwitch('disabled', true);
                        _itemIsActive = state;
                    }
                });

                var departmentTable = $("#tblDepartmentList").DataTable({
                    serverSide: false,
                    select: true,
                    searching: true,
                    ordering: true,
                    pagingType: "full_numbers",
                    paginate: true,
                    processing: true,
                    lengthMenu: true,
                    autoWidth: false,
                    lengthMenu: [[5, 25, 50, 100, 250, -1], [5, 25, 50, 100, 250, "All"]],
                    info: true,
                    columns: [
                        { "data": "IsActive" },
                        { "data": "Name" },
                        { "data": "Id" }
                    ],
                    columnDefs: [
                        {
                            "targets": [0],
                            "width": "1%",
                            "className": "text-center",
                            "render": function (data, type, row, meta) {
                                if (data == true) {
                                    return '<span class="label label-success text-right">Aktif</span>';
                                } else {
                                    return '<span class="label label-danger">Pasif</span>';
                                }

                            }
                        },
                        {
                            "targets": [1],
                            "width": "80%"
                        },
                        {
                            "targets": [2],
                            "width": "10%",
                            "visible": false,
                            "searchable": false
                        }
                    ],
                    ajax: {
                        url: "Department/GetDepartments",
                        type: "GET",
                        dataType: "json",
                        dataSrc: ''
                    },
                    language: {
                        "search": "Arama",
                        "lengthMenu": "_MENU_",
                        "zeroRecords": "Kayıt Bulunamadı",
                        "info": "Toplam _PAGES_ dan _PAGE_. sayfa gösteriliyor.",
                        "infoFiltered": "(Toplam _MAX_ kayıt filtrelendi)",
                        "loadingRecords": "Yükleniyor...",
                        "processing": "İşlem Yapılıyor...",
                        "paginate": {
                            "first": "İlk",
                            "last": "Son",
                            "next": "Sonraki",
                            "previous": "Önceki"
                        },

                    }
                });

                // => Case/Department/Datatable Buttons
                var departmentTableButtons = new $.fn.dataTable.Buttons(departmentTable, {

                    buttons: [
                        {
                            text: '<i class="fa fa-fw fa-plus"></i>  Ekle',
                            action: function () {
                                departmentTable.rows().deselect();
                                Util.resetValue("department_Name");;
                                $('#p_departmentForm').modal("show");
                                $('#department_btnSave').hide();
                                $('#departmant_btnCreate').show();
                            }
                        },
                        {
                            text: '<i class="fa fa-fw fa-pencil"></i>  Düzenle',
                            action: function () {
                                var dataArr = [];
                                var selectedRowCount = departmentTable.rows('.selected').count();
                                var rows = $('tr.selected');
                                var rowData = departmentTable.rows(rows).data();
                                if (selectedRowCount != 0) {
                                    $.each($(rowData), function (key, value) {
                                        $('#p_departmentForm_title').text("Departman Bilgilerini Düzenle");
                                        dataArr.push(value["Id"]);
                                        dataArr.push(value["Name"]);
                                        dataArr.push(value["IsActive"]);
                                    });
                                    $('#p_departmentForm').modal("show");
                                    _selectedDepartmentId = dataArr[0];
                                    $('#department_Name').val(dataArr[1]);
                                    _itemIsActive = dataArr[2];
                                    $("[name='department_cbIsActive']").bootstrapSwitch("state", _itemIsActive);
                                    $('#department_btnSave').show();
                                    $('#departmant_btnCreate').hide();
                                }
                                else {
                                    alert("Departman Seçiniz...");
                                }
                            }
                        }
                    ],

                }).container().appendTo($('#box-header-buttons'));
                {
                    $('.dt-buttons').children().eq(0).attr('class', 'btn btn-sm btn-success');
                    $('.dt-buttons').children().eq(1).attr('class', 'btn btn-sm btn-primary');
                }
                // <= Case/Department/Datatable Buttons

                $("#departmant_btnCreate").click(function () {
                    Department.Create(_itemIsActive);
                });

                $("#department_btnSave").click(function () {
                    Department.Update(_selectedDepartmentId, _itemIsActive);
                });

                break;
            // <= Case/Department






            // => Case/Team
            case Util.cTeam:
                Team.GetDepartments();

                $("#liMenuTanimlamalar").attr('class', 'treeview active');
                $("#aMenuTeam").attr('class', 'aMenuSelected');

                $("[name='team_cbIsActive']").bootstrapSwitch({
                    onText: 'Aktif',
                    offText: 'Pasif ',
                    labelText: '',
                    labelWidth: 10,
                    handleWidth: 50,
                    onColor: 'success',
                    offColor: 'danger',

                    onSwitchChange: function (event, state) {
                        //$(this).bootstrapSwitch('disabled', true);
                        _itemIsActive = state;
                    }
                });

                var teamTable = $("#tblTeamList").DataTable({
                    serverSide: false,
                    select: true,
                    searching: true,
                    ordering: true,
                    pagingType: "full_numbers",
                    paginate: true,
                    processing: true,
                    autoWidth: false,
                    lengthMenu: [[5, 25, 50, 100, 250, -1], [5, 25, 50, 100, 250, "All"]],
                    info: true,
                    columns: [
                        { "data": "teamIsActive" },
                        { "data": "teamId" },
                        { "data": "teamName" },
                        { "data": "departmentName" },
                        { "data": "departmentId" }
                    ],
                    columnDefs: [
                        {
                            "targets": [0],
                            "width": "1%",
                            "className": "text-center",
                            "visible": true,
                            "searchable": true,
                            "render": function (data, type, row, meta) {
                                if (data == true) {
                                    return '<span class="label label-success text-right">Aktif</span>';
                                } else {
                                    return '<span class="label label-danger">Pasif</span>';
                                }

                            }
                        },
                        {
                            "targets": [1],
                            "width": "1%",
                            "className": "text-center",
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [2],
                            "width": "50%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [3],
                            "width": "20%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [4],
                            "width": "10%",
                            "visible": false,
                            "searchable": false
                        }

                    ],
                    ajax: {
                        url: "Team/GetTeams",
                        type: "GET",
                        dataType: "json",
                        dataSrc: ''
                    },
                    language: {
                        "search": "Arama",
                        "lengthMenu": "  _MENU_ ",
                        "zeroRecords": "Kayıt Bulunamadı",
                        "info": "Toplam _PAGES_ sayfadan _PAGE_. sayfa gösteriliyor.",
                        "infoFiltered": "(Toplam _MAX_ kayıt filtrelendi)",
                        "loadingRecords": "Yükleniyor...",
                        "processing": "İşlem Yapılıyor...",
                        "paginate": {
                            "first": "İlk",
                            "last": "Son",
                            "next": "Sonraki",
                            "previous": "Önceki"
                        },

                    }
                });

                // => Case/Team/Datatable Buttons
                var teamTableButtons = new $.fn.dataTable.Buttons(teamTable, {

                    buttons: [
                        {
                            text: '<i class="fa fa-fw fa-plus"></i>  Ekle',
                            action: function () {
                                teamTable.rows().deselect();
                                Util.resetValue("team_Name");;
                                $('#p_teamForm').modal("show");
                                $('#team_btnSave').hide();
                                $('#team_btnCreate').show();
                            }
                        },
                        {
                            text: '<i class="fa fa-fw fa-pencil"></i>  Düzenle',
                            action: function () {
                                var dataArr = [];
                                var selectedRowCount = teamTable.rows('.selected').count();
                                var rows = $('tr.selected');
                                var rowData = teamTable.rows(rows).data();
                                if (selectedRowCount != 0) {
                                    $.each($(rowData), function (key, value) {
                                        $('#p_teamForm_title').text("Takım Bilgilerini Düzenle");
                                        dataArr.push(value["teamId"]);
                                        dataArr.push(value["teamName"]);
                                        dataArr.push(value["departmentId"]);
                                        dataArr.push(value["teamIsActive"]);
                                    });

                                    $('#p_teamForm').modal("show");
                                    _selectedTeamId = dataArr[0];
                                    $('#team_Name').val(dataArr[1]);
                                    _selectedDepartmentId = dataArr[2];
                                    _itemIsActive = dataArr[3];
                                    $("[name='team_cbIsActive']").bootstrapSwitch("state", _itemIsActive);

                                    $('#departmanList').val(_selectedDepartmentId);
                                    $('#team_btnSave').show();
                                    $('#team_btnCreate').hide();

                                }
                                else {
                                    alert("Takım Seçiniz...");
                                }

                            }
                        }
                    ],

                }).container().appendTo($('#box-header-buttons'));
                {
                    $('.dt-buttons').children().eq(0).attr('class', 'btn btn-sm btn-success');
                    $('.dt-buttons').children().eq(1).attr('class', 'btn btn-sm btn-primary');



                    $("#team_btnCreate").click(function () {
                        Team.Create(_selectedDepartmentId, _itemIsActive);
                    });


                    $("#team_btnSave").click(function () {
                        Team.Update(_selectedTeamId, _selectedDepartmentId, _itemIsActive);
                    });
                }
                // <= Case/Team/Datatable Buttons
                break;
            // <= Case/Team





            // => Case/User
            case Util.cUser:
                User.GetDepartments();
                $("#liMenuTanimlamalar").attr('class', 'treeview active');
                $("#aMenuUser").attr('class', 'aMenuSelected');

                $("[name='user_cbIsActive']").bootstrapSwitch({
                    onText: 'Aktif',
                    offText: 'Pasif ',
                    labelText: '',
                    labelWidth: 10,
                    handleWidth: 50,
                    onColor: 'success',
                    offColor: 'danger',

                    onSwitchChange: function (event, state) {
                        //$(this).bootstrapSwitch('disabled', true);
                        _itemIsActive = state;
                    }
                });

                var userTable = $("#tblUserList").DataTable({
                    serverSide: false,
                    select: true,
                    searching: true,
                    ordering: true,
                    pagingType: "full_numbers",
                    paginate: true,
                    processing: true,
                    autoWidth: false,
                    lengthMenu: [[5, 25, 50, 100, 250, -1], [5, 25, 50, 100, 250, "All"]],
                    info: true,
                    columns: [
                        {
                            "data": "IsActive",
                            "className": "text-center",
                            "render": function (data, type, row, meta) {
                                if (data == true) {
                                    return '<span class="label label-success text-right">Aktif</span>';
                                } else {
                                    return '<span class="label label-danger">Pasif</span>';
                                }

                            }
                        },
                        { "data": "Id" },
                        { "data": "FullName" },
                        { "data": "Name" },
                        { "data": "Password" },
                        { "data": "Email" }
                    ],
                    columnDefs: [
                        {
                            "targets": [0],
                            "width": "1%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [1],
                            "width": "20%",
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [2],
                            "width": "20%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [3],
                            "width": "20%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [4],
                            "width": "30%",
                            "visible": true,
                            "searchable": true
                        },
                        {
                            "targets": [5],
                            "width": "10%",
                            "visible": true,
                            "searchable": true
                        }
                    ],
                    ajax: {
                        url: "User/GetUsers",
                        type: "GET",
                        dataType: "json",
                        dataSrc: ''
                    },
                    language: {
                        "search": "Arama",
                        "lengthMenu": "  _MENU_ ",
                        "zeroRecords": "Kayıt Bulunamadı",
                        "info": "Toplam _PAGES_ sayfadan _PAGE_. sayfa gösteriliyor.",
                        "infoFiltered": "(Toplam _MAX_ kayıt filtrelendi)",
                        "loadingRecords": "Yükleniyor...",
                        "processing": "İşlem Yapılıyor...",
                        "paginate": {
                            "first": "İlk",
                            "last": "Son",
                            "next": "Sonraki",
                            "previous": "Önceki"
                        },

                    }
                });

                // => Case/User/Datatable Buttons
                var userTableButtons = new $.fn.dataTable.Buttons(userTable, {

                    buttons: [
                        {
                            text: '<i class="fa fa-fw fa-plus"></i>  Ekle',
                            action: function () {
                                userTable.rows().deselect();
                                Util.resetValue("user_FullName");
                                Util.resetValue("user_Name");
                                Util.resetValue("user_Password");
                                Util.resetValue("user_RePassword");
                                Util.resetValue("user_Email");
                                $('#p_userForm_title').text("Ekle");
                                $('#p_userForm').modal("show");
                                $('#user_btnSave').hide();
                                $('#user_btnRegister').show();
                            }
                        },
                        {
                            text: '<i class="fa fa-fw fa-pencil"></i>  Düzenle',
                            action: function () {
                                var dataArr = [];
                                var selectedRowCount = userTable.rows('.selected').count();
                                var rows = $('tr.selected');
                                var rowData = userTable.rows(rows).data();
                                if (selectedRowCount != 0) {
                                    $.each($(rowData), function (key, value) {
                                        $('#p_userForm_title').text("Düzenle");
                                        dataArr.push(value["Id"]);
                                        dataArr.push(value["FullName"]);
                                        dataArr.push(value["Name"]);
                                        dataArr.push(value["Password"]);
                                        dataArr.push(value["Email"]);
                                        dataArr.push(value["IsActive"]);
                                    });
                                    $('#p_userForm').modal("show");
                                    _selectedUserId = dataArr[0];
                                    $('#user_FullName').val(dataArr[1]);
                                    $('#user_Name').val(dataArr[2]);
                                    $('#user_Password').val(dataArr[3]);
                                    $('#user_RePassword').val(dataArr[3]);
                                    $('#user_Email').val(dataArr[4]);
                                    _itemIsActive = dataArr[5];
                                    $("[name='user_cbIsActive']").bootstrapSwitch("state", _itemIsActive);
                                    $('#user_btnSave').show();
                                    $('#user_btnRegister').hide();
                                    User.GetDepartmentTeam(_selectedUserId);
                                }
                                else {
                                    alert("Kullanıcı Seçiniz...");
                                }
                            }
                        }
                    ],

                }).container().appendTo($('#box-header-buttons'));
                {
                    $('.dt-buttons').children().eq(0).attr('class', 'btn btn-sm btn-success');
                    $('.dt-buttons').children().eq(1).attr('class', 'btn btn-sm btn-primary');
                }

                $("#user_btnRegister").click(function () {
                    User.Create();
                });

                $("#user_btnSave").click(function () {
                    User.Update();
                });

                $("#user_btnSaveTeam").click(function () {
                    User.DepartmentTeamInsert();
                });

                // <= Case/User/Datatable Buttons

                break;
            // <= Case/User
            default:
        }
        // <= Case
    }

});
// <= READY


// => UTIL
{
    var Util = {
        // => UTIL/Varriables
        ajaxUrl: '../../Emektar.Website/',
        // <= UTIL/Varriables


        // => UTIL/Pages
        goToPage_Login: 'Account',
        goToPage_Register: 'Account',
        goToPage_Home: 'Home',
        // <= UTIL/Pages


        // => UTIL/Controllers
        cHome: 'Home',
        cAccount: 'Account',
        cDepartment: 'Department',
        cTeam: 'Team',
        cUser: 'User',
        // <= UTIL/Controllers


        // => UTIL/Button's IDs
        btnLogin: '#user_btnLogin',
        btnRegister: '#user_btnRegister',
        btnSave: '#user_btnSave',
        // <= UTIL/Buttons

        toastrMessageError: function (message) {
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.error(message);
        },

        toastrMessageSuccess: function (message) {
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.success(message);
        },

        modalConfirm: function (title, body, button) {
            document.getElementById("modalConfirmTitle").innerHTML = title;
            document.getElementById("modalConfirmBodyText").innerHTML = body;
            document.getElementById("modalConfirmBtn").innerHTML = button;
        },

        modalHide: function (modalId) {
            $(modalId).modal('hide');
        },

        ajaxCall: function (url, type, dataType, data, success, error) {
            var ajax = $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                success: success,
                error: error
            });

        },

        resetValue: function (object) {
            //document.getElementById(object).value = "";
            $("#" + object).val('');
        },

        setValue: function (object, value) {
            document.getElementById(object).innerHTML = value;
        },

        setDisable: function (object, value) {
            document.getElementById(object).disabled = value;
        },

        setLoadingButton: function (btn) {
            $(btn).button('loading');
        },

        defaultLoadingButton: function (btn) {
            $(btn).button('reset');
        }

    };
}
// <= UTIL



// => ACCOUNT
{
    var _user;
    var _userDepartmentTeam;
    var _selectedUserId = 0;
    var User = {

        // => ACCOUNT/Session Timeout Popup
        SessionTimeout: function () {
            jQuery.timeoutDialog.setupDialogTimer({
                timeout: 100000, // Session Timeout süresini temsil ediyor(110 = oturum başladıktan 10 saniye sonra popup açar)(100000 = 1000 saniye ~ 20 dk)
                countdown: 100, // Popup açıldıktan 100 saniye sonra otomatik loguot yapar.
                logout_redirect_url: 'Account/Logout',
                keep_alive_url: 'Account/KeepAlive'
            });
        },
        // <= ACCOUNT/Session Timeout Popup


        // => ACCOUNT/Create
        Create: function () {

            Util.setLoadingButton(Util.btnRegister);

            _user = new Object();
            _user.FullName = $('#user_FullName').val();
            _user.Name = $('#user_Name').val();
            _user.Password = $('#user_Password').val();
            _user.Email = $('#user_Email').val();
            _user.IsActive = _itemIsActive;

            Util.ajaxCall(Util.ajaxUrl + "Account/Create", 'POST', 'json', _user, User.CreateSuccess, User.CreateError);
        },
        CreateSuccess: function (data) {
            alert("Kullanıcı Kaydedildi. Burayı notify yap");
            Util.defaultLoadingButton(Util.btnSave);
            $('#p_userForm').modal('hide');
            $('#tblUserList').DataTable().ajax.reload();
        },
        CreateError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/Create




        // => ACCOUNT/Update
        Update: function () {

            Util.setLoadingButton(Util.btnSave);

            _user = new Object();
            _user.Id = _selectedUserId;
            _user.FullName = $('#user_FullName').val();
            _user.Name = $('#user_Name').val();
            _user.Password = $('#user_Password').val();
            _user.Email = $('#user_Email').val();
            _user.IsActive = _itemIsActive;
        
            Util.ajaxCall(Util.ajaxUrl + "Account/Update", 'POST', 'json', _user, User.UpdateSuccess, User.UpdateError);
        },
        UpdateSuccess: function (data) {
            alert("Kullanıcı Değişiklikleri Kaydedildi. Burayı notify yap");
            Util.defaultLoadingButton(Util.btnSave);
            $('#p_userForm').modal('hide');
            $('#tblUserList').DataTable().ajax.reload();
        },
        UpdateError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/Update



        // => ACCOUNT/DepartmentTeamInsert
        DepartmentTeamInsert: function () {
            
            Util.setLoadingButton("#user_btnSave");

            _userDepartmentTeam = new Object();
            _userDepartmentTeam.Department_Id = _selectedDepartmentId;
            _userDepartmentTeam.Team_Id = _selectedTeamId;
            _userDepartmentTeam.User_Id = _selectedUserId;

            var _userDepartmentTeamArray = new Array();
            _userDepartmentTeamArray[0] = _selectedUserId;
            _userDepartmentTeamArray[1] = _selectedDepartmentId;
            _userDepartmentTeamArray[2] = _selectedTeamId;
            var _userDepartmentTeamArrayPost = { values: _userDepartmentTeamArray };



            Util.ajaxCall(Util.ajaxUrl + "Account/DepartmentTeamInsert", 'POST', 'json', _userDepartmentTeamArrayPost, User.DepartmentTeamInsertSuccess, User.DepartmentTeamInsertError);
        },
        DepartmentTeamInsertSuccess: function (data) {
            if (data.Id == -1) {
                alert("Kullanıcı bu takıma zaten kayıtlı.");
            }
            else {
                $('#p_userForm').modal('hide');
                $('#tblUserList').DataTable().ajax.reload();
            }
            Util.defaultLoadingButton("#user_btnSave");
        },
        DepartmentTeamInsertError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/DepartmentTeamInsert



        // => ACCOUNT/GetDepartmentTeam
        GetDepartmentTeam: function () {
            
            _userDepartmentTeam = new Object();
            _userDepartmentTeam.User_Id = _selectedUserId;

            var _userDepartmentTeamArray = new Array();
            _userDepartmentTeamArray[0] = _selectedUserId;
            var _userDepartmentTeamArrayPost = { values: _userDepartmentTeamArray };
            
            Util.ajaxCall(Util.ajaxUrl + "Account/GetDepartmentTeam", 'POST', 'json', _userDepartmentTeamArrayPost, User.GetDepartmentTeamSuccess, User.GetDepartmentTeamError);
        },
        GetDepartmentTeamSuccess: function (data) {
            if (data.Id == -1) {
                
            }
            else {
                var userDepartmentTeamTable = $("#tblUserDepartmentTeamList").DataTable({
                    serverSide: false,
                    select: true,
                    destroy: true,
                    searching: true,
                    ordering: true,
                    pagingType: "full_numbers",
                    paginate: true,
                    processing: true,
                    lengthMenu: true,
                    autoWidth: false,
                    lengthMenu: [[5, 25, 50, 100, 250, -1], [5, 25, 50, 100, 250, "All"]],
                    info: true,
                    data:data,
                    columns: [
                        { "data": "departmentName" },
                        { "data": "teamName" }
                    ],
                    columnDefs: [
                        {
                            "targets": [0],
                            "width": "50%"
                        },
                        {
                            "targets": [1],
                            "width": "50%"
                        }
                    ],
                    language: {
                        "search": "Arama",
                        "lengthMenu": "_MENU_",
                        "zeroRecords": "Kayıt Bulunamadı",
                        "info": "Toplam _PAGES_ dan _PAGE_. sayfa gösteriliyor.",
                        "infoFiltered": "(Toplam _MAX_ kayıt filtrelendi)",
                        "loadingRecords": "Yükleniyor...",
                        "processing": "İşlem Yapılıyor...",
                        "paginate": {
                            "first": "İlk",
                            "last": "Son",
                            "next": "Sonraki",
                            "previous": "Önceki"
                        },

                    }
                });
                
            }
            
        },
        GetDepartmentTeamError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/GetDepartmentTeam





        // => ACCOUNT/Passive
        Passive: function (id) {

            Util.setLoadingButton("#user_btnPassive");

            var _id = id;

            _user = new Object();
            _user.Id = _id;

            Util.ajaxCall(Util.ajaxUrl + "Account/Passive", 'POST', 'json', _user, User.PassiveSuccess, User.PassiveError);
        },
        PassiveSuccess: function (data) {
            alert("Kullanıcı pasif hale çekildi.Burayı notify yap");
            Util.defaultLoadingButton("#user_btnPassive");
            $('#p_genericModal').modal('hide');
            $('#tblUserList').DataTable().ajax.reload();
        },
        PassiveError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/Passive




        // => ACCOUNT/Login
        Login: function (name, password) {

            Util.setLoadingButton(Util.btnLogin);

            var _password = $(password).val();
            var _name = $(name).val();

            _user = new Object();
            _user.Password = _password;
            _user.Name = _name;

            Util.ajaxCall(Util.ajaxUrl + "Account/Login", 'POST', 'json', _user, User.LoginSuccess, User.LoginError);
        },
        LoginSuccess: function (data) {
            if (data.Id > 0) {
                window.location = Util.goToPage_Home;
            }
        },
        LoginError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/Login



        // => ACCOUNT/Get User
        GetUser: function () {
            Util.ajaxCall(Util.ajaxUrl + "Account/GetUser", 'POST', 'json', _user, User.GetUserSuccess, User.GetUserError);
        },
        GetUserSuccess: function (data) {
            if (data.Id > 0) {
                _user = new Object();
                _user.FullName = data.FullName;
                _user.Name = data.Name;
                _user.Password = data.Password;
                _user.Email = data.Email;

                $("#txtUserFullNameLeftMenu").html(_user.FullName);
                $("#txtUserFullNamePanelBtn").html(_user.FullName);
                $("#txtUserFullNameDepartmantPanel").html(_user.FullName + "<small>Yazılım Geliştirici</small>")
            }
        },
        GetUserError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/Get User


        // => ACCOUNT/GetDepartments
        GetDepartments: function () {
            Util.ajaxCall(Util.ajaxUrl + "Department/GetDepartments", 'POST', 'json', '', User.GetDepartmentsSuccess, User.GetDepartmentsError);
        },
        GetDepartmentsSuccess: function (data) {
            $("#departmanList").append("<option value='a' selected disabled >Departman</option>");
            for (var i = 0; i < data.length; i++) {
                $("#departmanList").append("<option value=" + data[i].Id + " id=department" + data[i].Id + ">" + data[i].Name + "</option>");
            }
            
        },
        GetDepartmentsError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/GetDepartments


        // => ACCOUNT/GetDepartmentId
        GetDepartmentId: function (element) {
            _selectedDepartmentId = (element.options[element.selectedIndex].id).split("department")[1];
            User.GetTeamsWithDepartmentId();
        },
        // <= ACCOUNT/GetDepartmentId


        // => ACCOUNT/GetTeamsWithDepartmentId
        GetTeamsWithDepartmentId: function () {
            _department = new Object();
            _department.Id = _selectedDepartmentId;
            Util.ajaxCall(Util.ajaxUrl + "Team/GetTeamsWithDepartmentId", 'POST', 'json', _department, User.GetTeamsWithDepartmentIdSuccess, User.GetTeamsWithDepartmentIdError);
        },
        GetTeamsWithDepartmentIdSuccess: function (data) {
            $("#teamList").empty();
            $("#teamList").append("<option value='' selected disabled >Takım</option>");
            for (var i = 0; i < data.length; i++) {
                $("#teamList").append("<option value=" + data[i].Id + " id=team" + data[i].Id + ">" + data[i].Name + "</option>");
            }
            
        },
        GetTeamsWithDepartmentIdError: function (data) {
            alert("Hata:" + data);
        },
        // <= ACCOUNT/GetTeamsWithDepartmentId



        // => ACCOUNT/GetTeamId
        GetTeamId: function (element) {
            _selectedTeamId = (element.options[element.selectedIndex].id).split("team")[1];
        },
        // <= ACCOUNT/GetTeamId

    };
}
// <= ACCOUNT



// => DEPARTMENT
{
    var _department;
    var __selectedDepartmentId = 0;
    var Department = {

        // => DEPARTMENT/Create
        Create: function (isActive) {

            Util.setLoadingButton('#departmant_btnCreate');

            _department = new Object();
            _department.Name = $('#department_Name').val();
            _department.IsActive = isActive;

            Util.ajaxCall(Util.ajaxUrl + "Department/Create", 'POST', 'json', _department, Department.CreateSuccess, Department.CreateError);
        },
        CreateSuccess: function (data) {
            if (data.Id > 0) {
                alert("Departman Kaydedildi. Burayı notify yap");
                Util.defaultLoadingButton('#departmant_btnCreate');
                $("#p_departmentForm").modal('hide');
                Util.resetValue("department_Name");
                $('#tblDepartmentList').DataTable().ajax.reload();
            }
        },
        CreateError: function (data) {
            alert("Hata:" + data);
        },
        // <= DEPARTMENT/Create


        // => DEPARTMENT/Update
        Update: function (id, isActive) {

            Util.setLoadingButton("#department_btnSave");

            _department = new Object();
            _department.Id = id;
            _department.Name = $('#department_Name').val();
            _department.IsActive = isActive;

            Util.ajaxCall(Util.ajaxUrl + "Department/Update", 'POST', 'json', _department, Department.UpdateSuccess, Department.UpdateError);
        },
        UpdateSuccess: function (data) {
            alert("Departman Değişiklikleri Kaydedildi. Burayı notify yap");
            Util.defaultLoadingButton("#department_btnSave");
            $('#p_departmentForm').modal('hide');
            $('#tblDepartmentList').DataTable().ajax.reload();
        },
        UpdateError: function (data) {
            alert("Hata:" + data);
        },
        // <= DEPARTMENT/Update


    };
}
// <= DEPARTMENT


// => TEAM
{
    var _team;
    var _selectedDepartmentId = 0;
    var _selectedTeamId = 0;
    var Team = {

        // => TEAM/Create
        Create: function (departmentId, isActive) {

            Util.setLoadingButton(Util.btnCreateTeam);

            var _name = $('#team_Name').val();

            _team = new Object();
            _team.Name = _name;
            _team.DepartmentId = departmentId;
            _team.IsActive = isActive;

            Util.ajaxCall(Util.ajaxUrl + "Team/Create", 'POST', 'json', _team, Team.CreateSuccess, Team.CreateError);
        },
        CreateSuccess: function (data) {
            if (data.Id > 0) {
                alert("Team Kaydedildi. Burayı notify yap");
                Util.defaultLoadingButton('#team_btnCreate');
                $("#p_teamForm").modal('hide');
                Util.resetValue("team_Name");
                $('#tblTeamList').DataTable().ajax.reload();
            }
        },
        CreateError: function (data) {
            alert("Hata:" + data);
        },
        // <= TEAM/Create



        // => TEAM/Update
        Update: function (id, depId, isActive) {

            Util.setLoadingButton("#team_btnSave");


            _team = new Object();
            _team.Id = id;
            _team.Name = $('#team_Name').val();
            _team.DepartmentId = depId;
            _team.IsActive = isActive;

            Util.ajaxCall(Util.ajaxUrl + "Team/Update", 'POST', 'json', _team, Team.UpdateSuccess, Team.UpdateError);
        },
        UpdateSuccess: function (data) {
            alert("Takım Değişiklikleri Kaydedildi. Burayı notify yap");
            Util.defaultLoadingButton("#team_btnSave");
            $('#p_teamForm').modal('hide');
            $('#tblTeamList').DataTable().ajax.reload();
        },
        UpdateError: function (data) {
            alert("Hata:" + data);
        },
        // <= TEAM/Update




        // => TEAM/GetDepartmentId
        GetDepartmentId: function (element) {
            _selectedDepartmentId = (element.options[element.selectedIndex].id).split("department")[1];
        },
        // <= TEAM/GetDepartmentId



        // => TEAM/GetDepartments
        GetDepartments: function () {
            Util.ajaxCall(Util.ajaxUrl + "Department/GetDepartments", 'POST', 'json', '', Team.GetDepartmentsSuccess, Team.GetDepartmentsError);
        },
        GetDepartmentsSuccess: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#departmanList").append("<option value=" + data[i].Id + " id=department" + data[i].Id + ">" + data[i].Name + "</option>");
            }
            document.getElementById("departmanList").selectedIndex = -1;
        },
        GetDepartmentsError: function (data) {
            alert("Hata:" + data);
        },
        // <= TEAM/GetDepartments




        // => TEAM/GetTeams
        GetTeams: function () {
            Util.ajaxCall(Util.ajaxUrl + "Team/GetTeams", 'POST', 'json', '', Team.GetTeamsSuccess, Team.GetTeamsError);
        },
        GetTeamsSuccess: function (data) {


        },
        GetTeamsError: function (data) {
            alert("Hata:" + data);
        },
        // <= TEAM/GetTeams



    };
}
// <= TEAM