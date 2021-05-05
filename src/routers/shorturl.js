const express = require('express');
const validator = require('validator');
const dns = require('dns');
const Url = require('../models/url');
const router = express.Router();

router.post('/api/shorturl', async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send();
    }

    dns.lookup(url, (error) => {
        if (error) {
            return res.status(400).send({error: 'invalid url'});
        }
    })

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