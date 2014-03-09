/// <reference path="../../../declarations/underscore.d.ts" />
/// <reference path="../../../declarations/jquery.datatables.d.ts" />
/// <reference path="../../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (DataTables) {
        var JQueryDatatableHelper = (function () {
            function JQueryDatatableHelper() {
                this._initialized = false;
                this.initializeForBootstrap();
            }
            JQueryDatatableHelper.prototype.initializeForBootstrap = function () {
                if (!this._initialized) {
                    this._initialized = true;
                } else {
                    return;
                }

                //Needed for Twitter Bootstrap 2.0.3
                $.extend($.fn.dataTableExt.oStdClasses, {
                    "sWrapper": "dataTables_wrapper form-inline"
                });

                //Used by pagination plugin
                $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
                    return {
                        "iStart": oSettings._iDisplayStart,
                        "iEnd": oSettings.fnDisplayEnd(),
                        "iLength": oSettings._iDisplayLength,
                        "iTotal": oSettings.fnRecordsTotal(),
                        "iFilteredTotal": oSettings.fnRecordsDisplay(),
                        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
                        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
                    };
                };

                //Pagination Plugin for Twitter BootStrap
                $.extend($.fn.dataTableExt.oPagination, {
                    "bootstrap": {
                        "fnInit": function (oSettings, nPaging, fnDraw) {
                            var oLang = oSettings.oLanguage.oPaginate;
                            var fnClickHandler = function (e) {
                                e.preventDefault();
                                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                                    fnDraw(oSettings);
                                }
                            };

                            $(nPaging).addClass('pagination').append('<ul>' + '<li class="prev disabled"><a href="#">&laquo; Prev</a></li>' + '<li class="next disabled"><a href="#">Next &raquo;</a></li>' + '</ul>');
                            var els = $('a', nPaging);
                            $(els[0]).bind('click.DT', { action: "previous" }, fnClickHandler);
                            $(els[1]).bind('click.DT', { action: "next" }, fnClickHandler);
                        },
                        "fnUpdate": function (oSettings, fnDraw) {
                            var iListLength = 5;
                            var oPaging = oSettings.oInstance.fnPagingInfo();
                            var an = oSettings.aanFeatures.p;
                            var i = 0, j = 0, iLen = 0, sClass, iStart = 0, iEnd = 0, iHalf = Math.floor(iListLength / 2);

                            if (oPaging.iTotalPages < iListLength) {
                                iStart = 1;
                                iEnd = oPaging.iTotalPages;
                            } else if (oPaging.iPage <= iHalf) {
                                iStart = 1;
                                iEnd = iListLength;
                            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                                iStart = oPaging.iTotalPages - iListLength + 1;
                                iEnd = oPaging.iTotalPages;
                            } else {
                                iStart = oPaging.iPage - iHalf + 1;
                                iEnd = iStart + iListLength - 1;
                            }

                            iLen = an.length;

                            for (i = 0; i < iLen; i++) {
                                // Remove the middle elements
                                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                                for (j = iStart; j <= iEnd; j++) {
                                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>').insertBefore($('li:last', an[i])[0]).bind('click', function (e) {
                                        e.preventDefault();
                                        oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                        fnDraw(oSettings);
                                    });
                                }

                                // Add / remove disabled classes from the elements
                                if (oPaging.iPage === 0) {
                                    $('li:first', an[i]).addClass('disabled');
                                } else {
                                    $('li:first', an[i]).removeClass('disabled');
                                }

                                if (oPaging.iPage === oPaging.iTotalPages - 1) {
                                    $('li:last', an[i]).addClass('disabled');
                                } else {
                                    $('li:last', an[i]).removeClass('disabled');
                                }
                            }
                        }
                    }
                });
            };

            JQueryDatatableHelper.prototype.overrideFixedLayout = function () {
                return "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>";
            };

            JQueryDatatableHelper.prototype.getAoDataSettingValue = function (aoData, setting) {
                var itemResult = _.find(aoData, function (item) {
                    return item.name == setting;
                });
                return itemResult ? itemResult.value : null;
            };

            JQueryDatatableHelper.prototype.GetDataTableServerData = function (aoData) {
                var data = {
                    pageSize: this.getAoDataSettingValue(aoData, 'iDisplayLength'),
                    page: 0,
                    sortDirection: this.getAoDataSettingValue(aoData, 'sSortDir_0'),
                    sortColumnIndex: this.getAoDataSettingValue(aoData, 'iSortCol_0'),
                    sortColumn: null,
                    search: this.getAoDataSettingValue(aoData, 'sSearch')
                };
                data.page = Math.floor(this.getAoDataSettingValue(aoData, 'iDisplayStart') / data.pageSize);
                data.sortColumn = this.getAoDataSettingValue(aoData, 'mDataProp_' + data.sortColumnIndex);
                return data;
            };

            JQueryDatatableHelper.prototype.CreatePagedDataTable = function ($selector, fnGetData, dataTableSettings, fluidLayout) {
                var _this = this;
                if (typeof dataTableSettings === "undefined") { dataTableSettings = null; }
                if (typeof fluidLayout === "undefined") { fluidLayout = false; }
                var dtSettings = {
                    "bRetrieve": true,
                    "bProcessing": true,
                    "bServerSide": true,
                    "sPaginationType": "bootstrap",
                    "oLanguage": {
                        "sLengthMenu": '<select >' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '</select> per page',
                        "sSearch": "Search _INPUT_",
                        "sInfo": "_START_ thru _END_ (of _TOTAL_ total records)"
                    },
                    "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
                };

                $.extend(dtSettings, dataTableSettings || {});

                if (fluidLayout)
                    dtSettings["sDom"] = this.overrideFixedLayout();

                if (!dtSettings["fnServerData"] && fnGetData) {
                    $.extend(dtSettings, {
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            var dtServerData = _this.GetDataTableServerData(aoData);

                            $.when(fnGetData(dtServerData.search, dtServerData.page, dtServerData.pageSize, dtServerData.sortColumn, dtServerData.sortDirection)).done(function (collection) {
                                fnCallback({
                                    "iTotalRecords": collection.length < 1 ? 0 : collection[0].TotalRows,
                                    "iTotalDisplayRecords": collection.length < 1 ? 0 : collection[0].TotalRows,
                                    "aaData": collection
                                });
                            });
                        }
                    });
                }

                return $selector.dataTable(dtSettings);
            };

            JQueryDatatableHelper.prototype.CreateXhrDataTable = function ($selector, fnGetData, dataTableSettings, fluidLayout) {
                var _this = this;
                if (typeof dataTableSettings === "undefined") { dataTableSettings = null; }
                if (typeof fluidLayout === "undefined") { fluidLayout = false; }
                var dtSettings = {
                    "bRetrieve": true,
                    "bProcessing": true,
                    "bServerSide": true,
                    "bPaginate": false,
                    "sDom": "<'row'<'span0'l><'span12'f>r>t<'row'<'span6'i><'span6'p>>"
                };

                $.extend(dtSettings, dataTableSettings || {});

                if (fluidLayout)
                    dtSettings["sDom"] = this.overrideFixedLayout();

                if (!dtSettings["fnServerData"] && fnGetData) {
                    $.extend(dtSettings, {
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            var dtServerData = _this.GetDataTableServerData(aoData);

                            $.when(fnGetData(dtServerData.search, dtServerData.sortColumn, dtServerData.sortDirection)).done(function (collection) {
                                fnCallback({
                                    "iTotalRecords": collection.length.toString(),
                                    "iTotalDisplayRecords": collection.length.toString(),
                                    "aaData": collection
                                });
                            });
                        }
                    });
                }

                return $selector.dataTable(dtSettings);
            };

            JQueryDatatableHelper.prototype.CreateDataTable = function ($selector, data, dataTableSettings, fluidLayout) {
                if (typeof dataTableSettings === "undefined") { dataTableSettings = null; }
                if (typeof fluidLayout === "undefined") { fluidLayout = false; }
                var dtSettings = {
                    "bRetrieve": true,
                    "aaData": data,
                    "bPaginate": false,
                    "sDom": "<'row'<'span0'l><'span12'f>r>t<'row'<'span6'i><'span6'p>>"
                };

                $.extend(dtSettings, dataTableSettings || {});

                if (fluidLayout)
                    dtSettings["sDom"] = this.overrideFixedLayout();

                return $selector.dataTable(dtSettings);
            };
            return JQueryDatatableHelper;
        })();
        DataTables.JQueryDatatableHelper = JQueryDatatableHelper;
    })(A7.DataTables || (A7.DataTables = {}));
    var DataTables = A7.DataTables;
})(A7 || (A7 = {}));
