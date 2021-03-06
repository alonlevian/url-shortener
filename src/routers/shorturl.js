const express = require('express');
const dns = require('dns');
const Url = require('../models/url');
const validator = require('validator');
const router = express.Router();
const urlparser = require('urlparser');

router.post('/api/shorturl', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send();
    }

    if (!validator.isURL(url, { require_protocol: true })) {
        return res.send({ error: 'Invalid URL' });
    }

    const urlDocument = await Url.findOne({ original_url: url });

    if (urlDocument) {
        return res.send(urlDocument);
    }

    const lastDocumentNumber = await Url.getLastDocumentNumber();

    try {
        const addedUrl = new Url({
            original_url: url,
            short_url: lastDocumentNumber + 1
        });

        await addedUrl.save();

        res.send(addedUrl);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.get('/api/shorturl/:short_url', async (req, res) => {
    const short_url = req.params.short_url;

    const url = await Url.findOne({ short_url });

    if (!url) {
        return res.status(404).send();
    }

    res.redirect(url.original_url);
});

module.exports = router;