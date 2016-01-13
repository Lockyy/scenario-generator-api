module.exports = {
  getDateInUserTimeZone: function (strDate) {
    return new Date(strDate)
  },
  getStrDateInDefaultFormat: function (strDate) {
    if (!_.isEmpty(strDate)) {
      let formattedDate = this.getDateInUserTimeZone(strDate);
      return formattedDate.format(this.getDefaultFormat());
    }
  },
  getDefaultFormat: function () {
    return "mmm d, yyyy";
  }
};
