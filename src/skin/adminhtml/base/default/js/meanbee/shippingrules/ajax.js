'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.ajax = {
        /* /admin/shippingrules/terms */
        getTermFields: function () {
            return [{ value: 'quantity',          label: 'Total Quantity'     },
                    { value: 'subtotal',          label: 'Subtotal excl. Tax' },
                    { value: 'subtotal_incl_tax', label: 'Subtotal incl. Tax' },
                    { value: 'weight',            label: 'Total Weight'       }
                   ];
        },
        /* /admin/shippingrules/ajax/aggregators */
        getAggregators: function () {
            return [{ value: 'Conjunctive', label: 'ALL' },
                    { value: 'Disjunctive', label: 'ANY' }
                   ];
        },
        /* /admin/shippingrules/ajax/conditions POST $context */
        getConditionFields: function () {
            return [{ label: 'Magento Environment',
                      value: [{ value: 'store_id',                    label: 'Magento Store',            type: 'Environment',
                                options: []                                                                                  },
                              { value: 'website_id',                  label: 'Magento Website',          type: 'Environment',
                                options: []                                                                                  },
                              { value: 'is_admin_order',              label: 'Is an Admin Order',        type: 'Environment',
                                options: [{ value: 0, label: 'FALSE' },
                                          { value: 1, label: 'TRUE'  }]                                                      }]},
                    { label: 'Customer Information',
                      value: [{ value: 'customer_group_id',           label: 'Customer Group',           type: 'Customer'    }]},
                    { label: 'Cart Conditions',
                      value: [{ value: 'package_weight',              label: 'Total Weight',             type: 'Cart'        },
                              { value: 'package_qty',                 label: 'Total Items Quantity',     type: 'Cart'        },
                              { value: 'package_value',               label: 'Subtotal excl. Tax',       type: 'Cart'        },
                              { value: 'base_subtotal_incl_tax',      label: 'Subtotal incl. Tax',       type: 'Cart'        },
                              { value: 'package_value_with_discount', label: 'Subtotal after Discounts', type: 'Cart'        }]},
                    { label: 'Promotional Conditions',
                      value: [{ value: 'promo_coupon',                label: 'Coupon',                   type: 'Promotion'   },
                              { value: 'promo_free_shipping',         label: 'Free Shipping',            type: 'Promotion',
                                options: [{ value: 0, label: 'Not Active' },
                                          { value: 1, label: 'Active'     }]                                                 }]},
                    { label: 'Time Conditions',
                      value: [{ value: 'time_time_of_day',            label: 'Time of Day',              type: 'Time'        },
                              { value: 'time_timestamp',              label: 'Date/Time',                type: 'Time'        }]},
                    { label: 'Destination Conditions',
                      value: [{ value: 'dest_country_id',             label: 'Shipping Country',         type: 'Destination' },
                              { value: 'dest_country_group',          label: 'Shipping Country Group',   type: 'Destination' },
                              { value: 'dest_region_id',              label: 'Shipping State/Province',  type: 'Destination' },
                              { value: 'compound_postal_code',        label: 'Shipping Postal Code',     type: 'Destination' }]},
                    { label: 'Cart Items Conditions',
                      value: [{ value: 'compound_subselection',       label: 'Cart Items Subselection',  type: 'Product'     }]},
                    { value: 'compound_condition_group',    label: 'Conditions Combination'   }
                   ];
        },
        /* /admin/shippingrules/ajax/comparators POST $types */
        getComparators: function (conditionField) {
            switch (conditionField) {
            case 'store_id':
            case 'website_id':
                return [{ value: '===§',        label: 'IS',                       inputType: 'select'               },
                        { value: '!==§',        label: 'IS NOT',                   inputType: 'select'               },
                        { value: '∈ {§}',       label: 'IS ONE OF',                inputType: 'x-multiselect'        },
                        { value: '!∈ {§}',      label: 'IS NOT ONE OF',            inputType: 'x-multiselect'        }
                       ];
            case 'package_qty':
            case 'package_value':
            case 'base_subtotal_incl_tax':
            case 'package_value_with_discount':
            case 'package_weight':
            case 'postal_code_numeric_base_10':
                return [{ value: '===§',        label: 'IS',                       inputType: 'number'               },
                        { value: '!==§',        label: 'IS NOT',                   inputType: 'number'               },
                        { value: '>=§',         label: 'GREATER THAN OR EQUAL TO', inputType: 'number'               },
                        { value: '>§',          label: 'GREATER THAN',             inputType: 'number'               },
                        { value: '<=§',         label: 'LESS THAN OR EQUAL TO',    inputType: 'number'               },
                        { value: '<§',          label: 'LESS THAN',                inputType: 'number'               },
                        { value: '∈ [§..§]',    label: 'IS BETWEEN',               inputType: 'x-interval'           },
                        { value: '!∈ [§..§]',   label: 'IS NOT BETWEEN',           inputType: 'x-interval'           },
                        { value: '∈ {§}',       label: 'IS ONE OF',                inputType: 'text',                inputPattern: '[0-9, ]*' },
                        { value: '!∈ {§}',      label: 'IS NOT ONE OF',            inputType: 'text',                inputPattern: '[0-9, ]*' },
                        { value: '~',           label: 'MATCHES REGEX',            inputType: 'text'                 }
                       ];
            case 'promo_coupon':
            case 'postal_code_string':
                return [{ value: '===§',        label: 'IS',                       inputType: 'text'                 },
                        { value: '!==§',        label: 'IS NOT',                   inputType: 'text'                 },
                        { value: '~/^.*§.*$/',  label: 'CONTAINS',                 inputType: 'text'                 },
                        { value: '!~/^.*§.*$/', label: 'DOES NOT CONTAIN',         inputType: 'text'                 },
                        { value: '∈ {§}',       label: 'IS ONE OF',                inputType: 'text'                 },
                        { value: '!∈ {§}',      label: 'IS NOT ONE OF',            inputType: 'text'                 },
                        { value: '~/^§.*$/',    label: 'BEGINS WITH',              inputType: 'text'                 },
                        { value: '!~/^§.*$/',   label: 'DOES NOT BEGIN WITH',      inputType: 'text'                 },
                        { value: '~/^.*§$/',    label: 'ENDS WITH',                inputType: 'text'                 },
                        { value: '!~/^.*§$/',   label: 'DOES NOT END WITH',        inputType: 'text'                 },
                        { value: '~',           label: 'MATCHES REGEX',            inputType: 'text'                 }
                       ];
            case 'is_admin_order':
            case 'promo_free_shipping':
                return [{ value: '===§',        label: 'IS',                       inputType: 'select'               }];
            case 'postal_code_numeric_base_26':
                return [{ value: '===§',        label: 'IS',                       inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '!==§',        label: 'IS NOT',                   inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '>=§',         label: 'GREATER THAN OR EQUAL TO', inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '>§',          label: 'GREATER THAN',             inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '<=§',         label: 'LESS THAN OR EQUAL TO',    inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '<§',          label: 'LESS THAN',                inputType: 'text',                inputPattern: '[A-Z]*'   },
                        { value: '∈ [§..§]',    label: 'IS BETWEEN',               inputType: 'x-interval',          inputPattern: '[A-Z]*'   },
                        { value: '!∈ [§..§]',   label: 'IS NOT BETWEEN',           inputType: 'x-interval',          inputPattern: '[A-Z]*'   },
                        { value: '∈ {§}',       label: 'IS ONE OF',                inputType: 'text',                inputPattern: '[A-Z, ]*' },
                        { value: '!∈ {§}',      label: 'IS NOT ONE OF',            inputType: 'text',                inputPattern: '[A-Z, ]*' },
                        { value: '~',           label: 'MATCHES REGEX',            inputType: 'text'                                          }
                       ];
            case 'postal_code_numeric_base_36':
                return [{ value: '===§',        label: 'IS',                       inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '!==§',        label: 'IS NOT',                   inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '>=§',         label: 'GREATER THAN OR EQUAL TO', inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '>§',          label: 'GREATER THAN',             inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '<=§',         label: 'LESS THAN OR EQUAL TO',    inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '<§',          label: 'LESS THAN',                inputType: 'text',                inputPattern: '[A-Z0-9]*'   },
                        { value: '∈ [§..§]',    label: 'IS BETWEEN',               inputType: 'x-interval',          inputPattern: '[A-Z0-9]*'   },
                        { value: '!∈ [§..§]',   label: 'IS NOT BETWEEN',           inputType: 'x-interval',          inputPattern: '[A-Z0-9]*'   },
                        { value: '∈ {§}',       label: 'IS ONE OF',                inputType: 'text',                inputPattern: '[A-Z0-9, ]*' },
                        { value: '!∈ {§}',      label: 'IS NOT ONE OF',            inputType: 'text',                inputPattern: '[A-Z0-9, ]*' },
                        { value: '~',           label: 'MATCHES REGEX',            inputType: 'text'                                             }
                       ];
            case 'time_time_of_day':
                return [{ value: '>=§',         label: 'AFTER',                    inputType: 'time'                 },
                        { value: '<=§',         label: 'BEFORE',                   inputType: 'time'                 },
                        { value: '∈ [§..§]',    label: 'IS BETWEEN',               inputType: 'x-interval-time'      },
                        { value: '!∈ [§..§]',   label: 'IS NOT BETWEEN',           inputType: 'x-interval-time'      }
                       ];
            case 'time_timestamp':
                return [{ value: '>=§',         label: 'AFTER',                    inputType: 'datetime-local'       },
                        { value: '<=§',         label: 'BEFORE',                   inputType: 'datetime-local'       },
                        { value: '∈ [§..§]',    label: 'IS BETWEEN',               inputType: 'x-interval-datetime'  },
                        { value: '!∈ [§..§]',   label: 'IS NOT BETWEEN',           inputType: 'x-interval-datetime'  }
                       ];
            default:
                return [];
            }
        },
        /* @obsolete @see getConditionFields */
        getPostalCodeFormats: function () {
            return [{ value: 'AU',  label: '🇦🇺 Australia',                                       example: ['7800'],
                      parser: /^(\d{4})$/,                                                          parts: ['b10']                             },
                    { value: 'AI',  label: '🇦🇮 Anguilla',                                        example: ['AI', '2640'],
                      parser: /^(AI)(\d{4})$/,                                                      parts: ['b36', '', 'b10']                  },
                    { value: 'AT',  label: '🇦🇹 Austria',                                         example: ['8993'],
                      parser: /^(\d{4})$/,                                                          parts: ['b10']                             },
                    { value: 'AQ',  label: '🇦🇶 British Antarctic Territory',                     example: ['BIQQ', '1', 'ZZ'],
                      parser: /^(BIQQ)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'BE',  label: '🇧🇪 Belgium',                                         example: ['1350'],
                      parser: /^(\d{4})$/,                                                          parts: ['b10']                             },
                    { value: 'BR',  label: '🇧🇷 Brazil',                                          example: ['27', '910', '050'],
                      parser: /^(\d{2})(\d{3})(\d{3}|)$/,                                           parts: ['b10', 'b10', 'b10', 'b10']        },
                    { value: 'CA',  label: '🇨🇦 Canada',                                          example: ['K1A', '0B1'],
                      parser: /^([A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z])(\d[A-CEGHJ-NPR-TVXY]\d)$/, parts: ['b36', 'b36', 'b36']               },
                    { value: 'CH',  label: '🇨🇭 Switzerland',                                     example: ['9632'],
                      parser: /^([1-9]\d{3})$/,                                                     parts: ['b10']                             },
                    { value: 'DE',  label: '🇩🇪 Germany',                                         example: ['97999'],
                      parser: /^(\d{5})$/,                                                          parts: ['b10']                             },
                    { value: 'DK',  label: '🇩🇰 Denmark',                                         example: ['6100'],
                      parser: /^(\d{3,4})$/,                                                        parts: ['b10']                             },
                    { value: 'ES',  label: '🇪🇸 Spain',                                           example: ['08398'],
                      parser: /^(0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/,                             parts: ['b10']                             },
                    { value: 'FK',  label: '🇫🇰 Falkland Islands',                                example: ['FIQQ', '1', 'ZZ'],
                      parser: /^(FIQQ)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'FR',  label: '🇫🇷 France',                                          example: ['97439'],
                      parser: /^(\d{1,5})$/,                                                        parts: ['b10']                             },
                    { value: 'FO',  label: '🇫🇴 Faroe Islands',                                   example: ['970'],
                      parser: /^(\d{3,4})$/,                                                        parts: ['b10']                             },
                    { value: 'GB',  label: '🇬🇧 United Kingdom',                                  example: ['W', '1A', '3', 'BP'],
                      parser: /^([A-Z]{1,2})(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/,                       parts: ['str', 'str', 'b36', 'b10', 'b26'] },
                    { value: 'GB+', label: '🇬🇧 British Forces Post Office',                      example: ['BFPO', '9999'],
                      parser: /^(BFPO)(\d{1,4})$/,                                                  parts: ['b36', '', 'b10']                  },
                    { value: 'GG',  label: '🇬🇬 Guernsey',                                        example: ['GY', '6', '8', 'RA'],
                      parser: /^(GY)(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/,                               parts: ['b36', '', 'b36', 'b10', 'b26']    },
                    { value: 'GI',  label: '🇬🇮 Gibraltar',                                       example: ['GX', '11', '1', 'AA'],
                      parser: /^(GX)(\d{1,2})(\d)([A-Z]{2})$/,                                      parts: ['b36', '', 'b10', 'b10', 'b26']    },
                    { value: 'GS',  label: '🇬🇸 South Georgia and the South Sandwich Islands',    example: ['SIQQ', '1', 'ZZ'],
                      parser: /^(SIQQ)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'IM',  label: '🇮🇲 Isle of Man',                                     example: ['IM', '4', '7', 'AA'],
                      parser: /^(IM)(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/,                               parts: ['b36', '', 'b36', 'b10', 'b26']    },
                    { value: 'IN',  label: '🇮🇳 India',                                           example: ['456', '001'],
                      parser: /^(\d{3})(\d{3})$/,                                                   parts: ['b10', 'b10', 'b10']               },
                    { value: 'HU',  label: '🇭🇺 Hungary',                                         example: ['1037'],
                      parser: /^(\d{4})$/,                                                          parts: ['b10']                             },
                    { value: 'IO',  label: '🇮🇴 British Indian Ocean Territory',                  example: ['BBND', '1', 'ZZ'],
                      parser: /^(BBND)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'IT',  label: '🇮🇹 Italy',                                           example: ['20090'],
                      parser: /^(\d{5})$/,                                                          parts: ['b10']                             },
                    { value: 'JE',  label: '🇯🇪 Jersey',                                          example: ['JE', '3', '5', 'FL'],
                      parser: /^(JE)(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/,                               parts: ['b36', '', 'b36', 'b10', 'b26']    },
                    { value: 'JP',  label: '🇯🇵 Japan',                                           example: ['876', '0854'],
                      parser: /^(\d{3})(\d{4})$/,                                                   parts: ['b10', 'b10', 'b10']               },
                    { value: 'LU',  label: '🇱🇺 Luxembourg',                                      example: ['L', '1248'],
                      parser: /^(L)(\d{4})$/,                                                       parts: ['b36', '', 'b10']                  },
                    { value: 'LV',  label: '🇱🇻 Latvia',                                          example: ['LV', '9999'],
                      parser: /^(LV|)(\d{4})$/,                                                     parts: ['b36', '', 'b10']                  },
                    { value: 'NL',  label: '🇳🇱 Netherlands',                                     example: ['2500', 'DL'],
                      parser: /^([1-9]\d{3})([A-Z]{2})$/,                                           parts: ['b36', 'b10', 'b26']               },
                    { value: 'SE',  label: '🇸🇪 Sweden',                                          example: ['732', '45'],
                      parser: /^(\d{3})(\d{2})$/,                                                   parts: ['b10', 'b10', 'b10']               },
                    { value: 'SH',  label: '🇸🇭 Saint Helena, Ascension and Tristan da Cunha',    example: ['ASCN', '1', 'ZZ'],
                      parser: /^(ASCN|STHL|TDCU)(\d)([A-Z]{2})$/,                                   parts: ['b36', 'str', 'b10', 'b26']        },
                    { value: 'PN',  label: '🇵🇳 Pitcairn Islands',                                example: ['PCRN', '1', 'ZZ'],
                      parser: /^(PCRN)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'PT',  label: '🇵🇹 Portugal',                                        example: ['1750', '396'],
                      parser: /^(\d{4})(\d{3})$/,                                                   parts: ['b10', 'b10', 'b10']               },
                    { value: 'RU',  label: '🇷🇺 Russia',                                          example: ['236', '592'],
                      parser: /^\d{6}$/,                                                            parts: ['b10']                             },
                    { value: 'TC',  label: '🇹🇨 Turks and Caicos Islands',                        example: ['TKCA', '1', 'ZZ'],
                      parser: /^(TKCA)(\d)([A-Z]{2})$/,                                             parts: ['b36', '', 'b10', 'b26']           },
                    { value: 'PL',  label: '🇵🇱 Poland',                                          example: ['05', '825'],
                      parser: /^(\d{2})(\d{3})$/,                                                   parts: ['b36', 'b10', 'b26']               },
                    { value: 'US',  label: '🇺🇸 United States of America',                        example: ['21064', '145'],
                      parser: /^(\d{5})(\d{4}|)$/,                                                  parts: ['b10', 'b10', 'b10']               }];
        },
        /* @todo remove */
        getPostalCodeFormatByCountryCode: function (key) {
            return global.Meanbee.ShippingRules.ajax.getPostalCodeFormats().filter(item => (item.value === key))[0];
        },
        /* @obsolete @see getConditionFields */
        getPostalCodeConditionFields: function (format) {
            var parts = global.Meanbee.ShippingRules.ajax.getPostalCodeFormatByCountryCode(format).parts;
            var options = [];
            parts.forEach((part, index) => {
                if (part) {
                    options.push({ value: index, label: `${['Entire Postal Code', '1st Part', '2nd Part', '3rd Pard', '4th Path'][index]} [${{
                        'str': 'A-Z,0-9',
                        'b10': '0-9',
                        'b26': 'A-Z',
                        'b36': '0-Z'
                    }[part]}]`, inputType: `postal_code_${{
                        'str': 'string',
                        'b10': 'numeric_base_10',
                        'b26': 'numeric_base_26',
                        'b36': 'numeric_base_36'
                    }[part]}` });
                }
            });
            options.push({ value: 'compound_postal_code_condition_group', label: 'Conditions Combination' });
            return options;
        },
        /* @move elsewhere */
        getConditionFieldByValue: function (value) {
            var conditionFields = global.Meanbee.ShippingRules.ajax.getConditionFields();
            return (function recurse (fields) {
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    if ({}.toString.call(field.value) === '[object Array]') {
                        let result = recurse(field.value);
                        if (result) return result;
                    } else {
                        if (field.value === value) return field;
                    }
                }
                return false;
            })(conditionFields);
        },
        getAggregateAttributes: function () {
            return [{ value: 'package_value', label: 'Total Price' }];
        }
    };
})(window);
