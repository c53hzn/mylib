//table2excel.js
//original src = "https://github.com/rainabba/jquery-table2excel"
//optimized version src = "https://github.com/davidkonrad/table2excel"

/* usage start*/
//
//export only column #2 and #3 and in reverse order
//NB! columns[] is zero based
//
// $("#mainTable").table2excel({
//     name: "Excel Document Name",
//     filename: "myFileName",
//     exclude_img: true,
//     exclude_links: true,
//     exclude_inputs: true,
//     columns : [1,10,11,12,15,17,18]
// })
//
/* usage end*/

//modified by Gigi, 2018-03-22
//table2excel.js
;(function ( $, window, document, undefined ) {
    var pluginName = "table2excel",

    defaults = {
        exclude: ".noExl",
        name: "Table2Excel",
		columns: []
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            //
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
    }

    Plugin.prototype = {
        init: function () {
            var e = this;

            e.template = {
                head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
                sheet: {
                    head: "<x:ExcelWorksheet><x:Name>",
                    tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
                },
                mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\"></head><body>",
                table: {
                    head: "<table>",
                    tail: "</table>"
                },
                foot: "</body></html>"
            };

            e.tableRows = [];

            // get contents of table except for exclude
            $(e.element).each( function(i,o) {
	        var tempRows = "";
		$(o).find("tr").not(e.settings.exclude).each(function (i,o) {
		        if (e.settings.columns.length == 0) {
	                        tempRows += "<tr>" + $(o).html() + "</tr>";
			} else {
				var row = "";
				e.settings.columns.forEach(function(colIndex) {
					//is it a thead or tbody row?
					if ($(o).find('th').length>0) {
						row += $(o).find('th:eq('+colIndex+')')[0].outerHTML;
					} else {
						row += $(o).find('td:eq('+colIndex+')')[0].outerHTML;
					}
				})
				tempRows += '<tr>'+row+'</tr>';
			}
                });
                e.tableRows.push(tempRows);
            });

            e.tableToExcel(e.tableRows, e.settings.name);
        },

        tableToExcel: function (table, name) {
            var e = this, fullTemplate="", i, link, a;

            e.uri = "data:application/vnd.ms-excel;base64,";
            e.base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)));
            };
            e.format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                });
            };
            e.ctx = {
                worksheet: name || "Worksheet",
                table: table
            };

            fullTemplate= e.template.head;

            if ( $.isArray(table) ) {
                for (i in table) {
                    //fullTemplate += e.template.sheet.head + "{worksheet" + i + "}" + e.template.sheet.tail;
                    fullTemplate += e.template.sheet.head + "Table" + i + "" + e.template.sheet.tail;
                }
            }

            fullTemplate += e.template.mid;

            if ( $.isArray(table) ) {
                for (i in table) {
                    fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
                }
            }

            fullTemplate += e.template.foot;

            for (i in table) {
                e.ctx["table" + i] = table[i];
            }
            delete e.ctx.table;

            if (typeof msie !== "undefined" && msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
            {
                if (typeof Blob !== "undefined") {
                    //use blobs if we can
                    fullTemplate = [fullTemplate];
                    //convert to array
                    var blob1 = new Blob(fullTemplate, { type: "text/html" });
                    window.navigator.msSaveBlob(blob1, getFileName(e.settings) );
                } else {
                    //otherwise use the iframe and save
                    //requires a blank iframe on page called txtArea1
                    txtArea1.document.open("text/html", "replace");
                    txtArea1.document.write(e.format(fullTemplate, e.ctx));
                    txtArea1.document.close();
                    txtArea1.focus();
                    sa = txtArea1.document.execCommand("SaveAs", true, getFileName(e.settings) );
                }

            } else {
                link = e.uri + e.base64(e.format(fullTemplate, e.ctx));
                a = document.createElement("a");
                a.download = getFileName(e.settings);
                a.href = link;

                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);
            }

            return true;
        }
    };

    function getFileName(settings) {
        return ( settings.filename ? settings.filename : "table2excel") + ".xls";
    }

    $.fn[ pluginName ] = function ( options ) {
        var e = this;
            e.each(function() {
                if ( !$.data( e, "plugin_" + pluginName ) ) {
                    $.data( e, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });

        // chain jQuery functions
        return e;
    };

})( jQuery, window, document );
