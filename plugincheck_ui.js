/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Plugin Check.
 *
 * The Initial Developer of the Original Code is
 * The Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2___
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Austin King <aking@mozilla.com> (Original Author)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/*jslint browser: true, plusplus: false */
/*global Pfs, Pfs_internal, PluginDetect, BrowserDetect, window, escape*/
// jslint that we should fix below
/*jslint eqeqeq: false*/

/**
 * UI code for http://mozilla.com/en-US/plugincheck/
 */
(function () {
    
    var icons = {
            flash:       "icon-flash.png",
            java:        "icon-java.png",
            quicktime:   "icon-quicktime.png",
            divx:        "icon-divx.png",
            totem:       "icon-totem.png",
            flip4mac:    "icon-flip4mac.png",
            wmp:         "icon-wmp.png",
            vlc:         "icon-vlc.png",
            silverlight: "icon-silverlight.png",
            shockwave:   "icon-shockwave.png",
            real:        "icon-real.png",
            acrobat:     "icon-acrobat.png",
            officelive:  "icon-officelive.png",
            iphoto:      "icon-iphoto.png",
            generic:     "default.png"
        },
        iconFor = function (pluginName) {
            if (pluginName.indexOf("Flash") >= 0) {
                return icons.flash;
            } else if (pluginName.indexOf("Java") >= 0) {
                return icons.java;
            } else if (pluginName.indexOf("QuickTime") >= 0) {
                return icons.quicktime;
            } else if (pluginName.indexOf("DivX") >= 0) {
                return icons.divx;
            } else if (pluginName.indexOf("Totem") >= 0) {
                return icons.totem;
            } else if (pluginName.indexOf("Flip4Mac") >= 0) {
                return icons.flip4mac;
            } else if (pluginName.indexOf("WindowsMediaPlayer") >= 0) {
                return icons.wpm;
            } else if (pluginName.indexOf("VLC") >= 0) {
                return icons.vlc;
            } else if (pluginName.indexOf("Silverlight") >= 0) {
                return icons.silverlight;
            } else if (pluginName.indexOf("Shockwave") >= 0) {
                return icons.shockwave;
            } else if (pluginName.indexOf("RealPlayer") >= 0) {
                return icons.real;
            } else if (pluginName.indexOf("Adobe Acrobat") >= 0) {
                return icons.acrobat;
            } else if (pluginName.indexOf("Office Live") >= 0) {
                return icons.officelive;
            } else if (pluginName.indexOf("iPhoto") >= 0) {
                return icons.iphoto;
            } else {
                return icons.generic;
            }
        },
        loadingCopy = Pfs_internal[0],
        loadingAlt = Pfs_internal[1];

    Pfs.$('#pfs-status').html(loadingCopy + " <img class='progress' src='/static/img/sandstone/ajax-loader.gif' alt='" + loadingAlt + "' />");
    Pfs.UI.DISABLE_LINK = "#howto-disable";
    Pfs.UI.disabledClick = function() {
    Pfs.$('.howto-disable-plugin')
            .css({backgroundColor: 'lightyellow'})
            .animate({backgroundColor: 'white'}, 3000);
    };

    if ('Explorer' === BrowserDetect.browser) {
        Pfs.$('#exploder').show('slow');
        Pfs.$('#modern_browsers').show();
    } else {
        var currentBrowser = true;
        var unknownBrowser = true;
        var supportedBrowserAndVersion = [
            ['Firefox', '3.5'], ['Safari', '4'], ['Opera', '10.5'], ['Chrome', '4'], ['Minefield', '4']
        ];

        for (var browserPV in supportedBrowserAndVersion) {
            if (supportedBrowserAndVersion[browserPV][0] === BrowserDetect.browser) {
                unknownBrowser = false;
            }
            if (supportedBrowserAndVersion[browserPV][0] === BrowserDetect.browser &&
                Pfs.compVersion(supportedBrowserAndVersion[browserPV][1], BrowserDetect.version) > 0) {
                currentBrowser = false;
                break;
            }
        }
        if (unknownBrowser === true) {
            Pfs.$('#modern_browsers').show('slow');
        } else if (currentBrowser === false) {
            Pfs.$('#old_browser').show('slow');
        }
    }
    // Copy below... s: Text in Status area  l: Button Label in Action area
    // PFs_internal is defined in messages.js
    var states = {};
    states[Pfs.VULNERABLE]       = {c: "button-negative", l: Pfs_internal[5],  s: Pfs_internal[6],  code: Pfs.VULNERABLE};
    states[Pfs.MAYBE_VULNERABLE] = {c: "button-negative", l: Pfs_internal[20], s: Pfs_internal[21], code: Pfs.MAYBE_VULNERABLE};
    states[Pfs.DISABLE]          = {c: "button-negative", l: Pfs_internal[3],  s: Pfs_internal[4],  code: Pfs.DISABLE};
    states[Pfs.OUTDATED]         = {c: "button-negative", l: Pfs_internal[7],  s: Pfs_internal[8],  code: Pfs.OUTDATED};
    states[Pfs.MAYBE_OUTDATED]   = {c: "button-negative", l: Pfs_internal[22], s: Pfs_internal[23], code: Pfs.MAYBE_OUTDATED};
    // no plugin_latest_status... It is set to the Version number detected
    states[Pfs.CURRENT]          = {c: "insensitive",  l: Pfs_internal[9],  s: undefined,        code: Pfs.CURRENT};
    states[Pfs.UNKNOWN]          = {c: "research",   l: Pfs_internal[10], s: Pfs_internal[11], code: Pfs.UNKNOWN};

    var updateDisplayId = undefined,
        showAll = false;

    var updateDisplay = function () {
        if (updateDisplayId !== undefined) {
            var criticalPlugins = Pfs.$('tr.plugin.' + Pfs.DISABLE).add('tr.plugin.' + Pfs.VULNERABLE).add('tr.plugin.' + Pfs.OUTDATED);
            criticalPlugins.show();
            Pfs.$('tr.plugin').removeClass('odd')
                          .filter(':visible')
                          .filter(':odd')
                          .addClass('odd');
            
            updateDisplayId = undefined;
        }
    };

    var addBySorting = function (el, status) {
        var r;
        if (Pfs.DISABLE === status) {
            //worst
            r = Pfs.$('tr.plugin.' + Pfs.DISABLE + ':first').before(el).size();
            if (r === 0) {
                // no disabled yet, go before any other plugin
                r = Pfs.$('tr.plugin:first').before(el).size();
                if (r === 0) {
                    //no other plugins, be the first plugin
                    Pfs.$('#plugin-template').parent().append(el);
                }
            }
        } else if (Pfs.VULNERABLE === status || Pfs.MAYBE_VULNERABLE === status) {
            //bad
            r = Pfs.$('tr.plugin.' + Pfs.DISABLE + ':last').after(el).size();
            if (r === 0) {
                // no disabled yet, go before any other vulnerable plugin
                r = Pfs.$('tr.plugin.' + Pfs.VULNERABLE + ':first').before(el).size();
                if (r === 0) {
                    // no vulnerable yet, go before any other outdated plugin
                    r = Pfs.$('tr.plugin.' + Pfs.OUTDATED + ':first').before(el).size();
                    if (r === 0) {
                        // no outdated yet, go before all others
                        r = Pfs.$('tr.plugin:first').before(el).size();
                        if (r === 0) {
                            //no other plugins, be the first plugin
                            Pfs.$('#plugin-template').parent().append(el);
                        }
                    }
                    
                }
            }
        } else if (Pfs.OUTDATED === status || Pfs.MAYBE_OUTDATED === status) {
            //meh
            r = Pfs.$('tr.plugin.' + Pfs.OUTDATED + ':first').before(el).size();
            if (r === 0) {
                r = Pfs.$('tr.plugin.' + Pfs.CURRENT + ':first').before(el).size();
                if (r === 0) {
                    r = Pfs.$('tr.plugin:last').after(el).size();
                    if (r === 0) {
                        //no other plugins, be the first plugin
                        Pfs.$('#plugin-template').parent().append(el);
                    }
                }
            }
        } else if (Pfs.CURRENT === status) {
            //best case we are up to date, stick it after the last non unknown plugin in the list
            r = Pfs.$('tr.plugin').not('.' + Pfs.UNKNOWN).filter(':last').after(el).size();
            if (r === 0) {
                r = Pfs.$('tr.plugin').filter(':first').before(el).size();
                if (r === 0) {
                    //no other plugins, be the first plugin
                    Pfs.$('#plugin-template').parent().append(el);
                }
                
            }
        } else if (Pfs.UNKNOWN === status) {
            //unknown plugins go last, not much help to the user
            r = Pfs.$('tr.plugin:last').after(el).size();
            if (r === 0) {
                //no other plugins, be the first plugin
                Pfs.$('#plugin-template').parent().append(el);
            }
        } else {
            Pfs.e("Sorting to display, unknown status", status);
        }
        if (updateDisplayId === undefined) {
            updateDisplayId = setTimeout(updateDisplay, 300);
        }
    };
    var displayPlugins = function (plugin, statusCopy, moreInfo, url, vulnerabilityUrl, rowCount) {
        var html = Pfs.$('#plugin-template').clone();
        html.removeAttr('id')
            .addClass('plugin')
            .addClass(statusCopy.code);
        var rowClass;
        
        Pfs.$('.name a', html).text(plugin.name);
        Pfs.$('.version', html).html(plugin.description);
        Pfs.$('.icon', html).attr('src', iconFor(plugin.name));

        if (moreInfo !== null) {
            Pfs.$('.status .copy', html).text(statusCopy.s + Pfs_internal[25]);
        } else {
            Pfs.$('.status .copy', html).text(statusCopy.s);
        }

        if (moreInfo !== null) {
        var moreInfoEl = Pfs.$(moreInfo);
            moreInfoEl.find('.vulner-url').attr('href', vulnerabilityUrl);
            Pfs.$('.status .copy', html).qtip(
                  {
              content: moreInfoEl,
              show: 'mouseover',
              hide: 'unfocus',
              api: {
                  onRender: function(){
                      this.elements.content.find('.qtip-closer').click(this.hide);
              }},
              position:{corner: {target:'bottomMiddle', tooltip: 'topMiddle'}},
              style: {tip: 'topMiddle'}});
            }
        Pfs.$('.action a', html).addClass(statusCopy.c);
        Pfs.$('.action a span', html).text(statusCopy.l);
        if (url !== undefined) {
            Pfs.$('.name a, .action a', html).attr('href', url)
            .filter('[href=' + Pfs.UI.DISABLE_LINK + ']').click(Pfs.UI.disabledClick);
        }
        
        addBySorting(html, statusCopy.code);
        
        html.show();
    };
    
    /* Pfs.UI.browserPlugins gives us a subset of the user's
           the navigator.plugins object has many more, including duplicates.
           Since this is a debugging view.... We'll show both */
    var pluginsObject = window.iePlugins || window.navigator.plugins || {};
    var browserPlugins = Pfs.UI.browserPlugins(pluginsObject);
    
    /* track plugins in the UI */
    var total = 0; var disabled = 0; var vulnerables = 0; var outdated = 0;
    
    /**
     * incremental callback function
     */
    var incrementalCallbackFn = function (data) {
        var moreInfo = null;
        if (data.status === Pfs.UNKNOWN) {
            if (data.pluginInfo.raw && data.pluginInfo.raw.name) {
                data.url = unknownPluginUrl(data.pluginInfo.raw.name);
            }
        }
        if (data.status === Pfs.NEWER) {
            data.status = Pfs.CURRENT;
        }
        if (states[data.status]) {
            switch (data.status) {
                case Pfs.DISABLE:
                    disabled++;
                    // Tooltip and anchor tag for instructions on how to disable a plugin
                    if ('vulnerability_url' in data) {
                moreInfo = Pfs_internal[24];
            }
                    data.url = Pfs.UI.DISABLE_LINK;
                    break;
                case Pfs.VULNERABLE:
                    vulnerables++;
                    // Tooltip and anchor tag for instructions on how to disable a plugin
                    if ('release_info' in data && 'vulnerability_url' in data.release_info) {
                moreInfo = Pfs_internal[24];
            }
                    break;
                case Pfs.OUTDATED:
                    outdated++;
                    break;
            }
            
            var copy = states[data.status];
            if (Pfs.CURRENT === data.status) {
                copy.s = Pfs.parseVersion(data.pluginInfo.detected_version).join('.');
            }
            var plugin = data.pluginInfo.raw;
            var url = data.url;
            vulnerabilityUrl = null;
        if ('release_info' in data && 'vulnerability_url' in data.release_info) {
                vulnerabilityUrl = data.release_info.vulnerability_url;
        }
            displayPlugins(plugin, copy, moreInfo, url, vulnerability_url, total);
            total++;
            
        } else {
            Pfs.e("We have an unknown status code when displaying UI.", data);
        }
    };

    var finishedCallbackFn = function () {
        for (var i = 0; i < Pfs.UI.unknownVersionPlugins.length; i++) {
            var unknownPlugin = Pfs.UI.unknownVersionPlugins[i];
            displayPlugins(unknownPlugin, states[Pfs.UNKNOWN], null, null, unknownPluginUrl(unknownPlugin.name), total);
            total++;
        }

        Pfs.UI.unknownVersionPlugins = [];
        var worstCount = 0;
        
        var worstStatus = undefined;
        if (disabled > 0) {
            worstCount = disabled;
            worstStatus = Pfs_internal[13];
        } else if (vulnerables > 0) {
            worstCount = vulnerables;
            worstStatus = Pfs_internal[14];
        } else if (outdated > 0) {
            worstCount = outdated;
            worstStatus = Pfs_internal[15];
        }
        
        if (worstStatus !== undefined) {
            Pfs.$('#pfs-status').html(worstStatus).addClass(Pfs.VULNERABLE);
        } else if (Pfs.$('.plugin').size() === 0) {
            Pfs.$('#pfs-status').html(Pfs_internal[17]);
        } else {
            Pfs.$('#pfs-status').html(Pfs_internal[16]);
        }
        if (Pfs.$('.plugin:hidden').size() > 0) {
            Pfs.$('.view-all-toggle').html("<a href='#'>" + Pfs_internal[2] + "</a>").click(function () {
                if (updateDisplayId === undefined) {
                    updateDisplayId = setTimeout(updateDisplay, 300);
                }
                showAll = true;
                Pfs.$('tr.plugin:hidden').show();
                Pfs.$('.view-all-toggle').remove();
                return false;
            });
        }
    };
    //Used in regression testing
    Pfs.UI.displayPlugin = incrementalCallbackFn;
    
    // This is the main function to call to get the ball rolling.
    // @endpoint                The end point to call
    // @incrementalCallbackFn   The function to call as each plugin is checked and data returned
    // @finishedCallbackFn      We are done, clean up please.
    window.checkPlugins = function (endpoint, incrementalCallbackFn, finishedCallbackFn) {
        if (endpoint.indexOf("http://") === 0) {
            endpoint = endpoint.substring(7);
        } else if (endpoint.indexOf("https://") === 0) {
            endpoint = endpoint.substring(8);
        }
        Pfs.endpoint = window.location.protocol + "//" + endpoint;
        Pfs.UI.navInfo = Pfs.UI.browserInfo();
        console.log(Pfs.UI.navInfo);
        Pfs.findPluginInfos(Pfs.UI.navInfo, browserPlugins, incrementalCallbackFn, finishedCallbackFn);
    };

})();
