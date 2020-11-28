class TimeHelper {
    static hoursToTimeString(hours, withMinutes=true) {
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rhours === 0) {
            return rminutes + "min";
        }
        if (rminutes < 10) {
            rminutes = "0" + rminutes;
        }
        if (withMinutes) {
            return rhours + "h" + rminutes;
        }
        return rhours + "h";
    }
}

export default TimeHelper;