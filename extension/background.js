chrome.tabs.onUpdated.addListener(

    async (tabId, changeInfo, tab) => {

        if (
            changeInfo.status === 'complete'
            && tab.url
        ) {

            console.log(
                'Visited URL:',
                tab.url
            )

            try {

                const response = await fetch(

                    'http://localhost:5000/scan-url',

                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            url: tab.url
                        })
                    }
                )

                const data =
                    await response.json()

                console.log(
                    'Security Result:',
                    data
                )

            } catch (error) {

                console.log(error)
            }
        }
    }
)