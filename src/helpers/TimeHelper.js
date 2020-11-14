class TimeHelper {
    static hoursToTimeString(hours) {
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rhours === 0) {
            return rminutes + "min";
        }
        if (rminutes < 10) {
            rminutes = "0" + rminutes;
        }
        return rhours + "h" + rminutes;
    }
}

export default TimeHelper;