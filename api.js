app.get("/api/applications", (req, res) => {

    const sql = `
        SELECT * FROM applications
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    });

});