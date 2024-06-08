/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2024-06-09 00:45:59
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2024-06-09 00:48:23
 * @FilePath     : /eug620.github.io/src/utils/formatSeconds.ts
 * @Description  : filename
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export function formatSeconds(value: any) {
    var theTime = parseInt(value);// 需要转换的时间秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    var theTime3 = 0;// 天
    if (theTime > 60) {
        theTime1 = parseInt(String(theTime / 60));
        theTime = parseInt(String(theTime % 60));
        if (theTime1 > 60) {
            theTime2 = parseInt(String(theTime1 / 60));
            theTime1 = parseInt(String(theTime1 % 60));
            if (theTime2 > 24) {
                //大于24小时
                theTime3 = parseInt(String(theTime2 / 24));
                theTime2 = parseInt(String(theTime2 % 24));
            }
        }
    }
    var result = '';
    if (theTime > 0) {
        result = "" + formatZero(String(theTime))
    }
    if (theTime1 > 0) {
        result = "" + formatZero(String(theTime1)) + ":" + result;
    }
    if (theTime2 > 0) {
        result = "" + formatZero(String(theTime2)) + ":" + result;
    }
    if (theTime3 > 0) {
        result = "" + formatZero(String(theTime3)) + ":" + result;
    }
    return result || '0';
}
export function formatZero(n:any ) {
    if (n == 0) {
        return "00";
    } else if (n > 0 && n <= 9) {
        return "0" + n;
    } else {
        return n;
    }
}
