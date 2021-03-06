const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        required: true
    }
});

urlSchema.methods.toJSON = function() {
    const url = this;

    return {short_url: url.short_url, original_url: url.original_url};
};

urlSchema.statics.getLastDocumentNumber = async () => {
    const lastDocument = await Url.find().sort({ _id: -1 }).limit(1);
    if (lastDocument.length == 0) {
        return 0;
    }

    return lastDocument[0].short_url;
}

const Url = mongoose.model('url', urlSchema);

module.exports = Url;