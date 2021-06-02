import * as puppeteer from 'puppeteer'
import * as notifier from 'node-notifier'

export const targetReRun = async  () => {



  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=1920,1080'],
    defaultViewport: null,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  })


  try {
    const page = await browser.newPage()
    await page.setRequestInterception(true)
      await page.setDefaultNavigationTimeout(0);

      page.on('request', async req => {
      if (req.resourceType() === 'image') {
        await req.abort()
      } else {
        await req.continue()
      }
    })

    await page.goto('https://www.target.com', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    })
    const accountDropdown = await page.$('#account')
    await accountDropdown.click()

    await page.waitForTimeout(4000)
    const signInButton = await page.$('#accountNav-signIn')
    await signInButton.click()
    await page.waitForTimeout(4000)
    await page.type('#username', 'ashish.narote@gmail.com')
    await page.type('#password', 'Computer@29988')
    await page.keyboard.press('Enter')

    await page.waitForTimeout(4000)
    const isJoinRequest = await page.$('#circle-join-free')
    if (isJoinRequest) {
      console.log('join request exists')
      const skipButton = await page.$('#circle-skip')
      await skipButton.click()
    } else {
      console.log("join request doesn't exists")
    }

    await page.goto(
      'https://www.target.com/p/playstation-5-console/-/A-81114595', {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        }
    )
    // await page.goto(
    //     'https://www.target.com/p/dualsense-wireless-controller-for-playstation-5-white-black/-/A-81114477'
    // )

    await page.waitForTimeout(4000)
      let i = 0;
    do {
      i++
        console.log(i)
        try {
            await await page.waitForSelector('div[data-test="soldOutBlock"]', {
                timeout: 4000
            })

        } catch (error) {
            console.log("Sold Out not found")
            console.log(error)
            await page.reload()
        }
      try {
        await page.waitForSelector('button[data-test="orderPickupButton"]', {
          timeout: 4000
        })
        break
      } catch (error) {

        await page.reload()
      }
    }while (i < 5);
      await browser.close();


      const shipItButton = await page.$('button[data-test="orderPickupButton"]')
    await shipItButton.click()
    await page.waitForTimeout(4000)

    const noCoverageButton = await page.$(
      'button[data-test="espModalContent-declineCoverageButton"]'
    )
    await noCoverageButton.click()

    await page.waitForTimeout(4000)
    const addToCartModalViewCartCheckout = await page.$(
      'button[data-test="addToCartModalViewCartCheckout"]'
    )
    await addToCartModalViewCartCheckout.click()

    await page.waitForTimeout(4000)
    const checkoutButton = await page.$('button[data-test="checkout-button"]')
    await checkoutButton.click()

    await page.waitForTimeout(4000)

      const isCVValreadythere = await page.$('#creditCardInput-cvv')

    if(isCVValreadythere) {
        await page.type('#creditCardInput-cvv', '835')
        await page.keyboard.press('Enter')
    }


    notifier.notify({
      title: 'Target',
      message: 'Ready to place order!',
      sound: true
    })

    await page.waitForTimeout(4000)
    const placeOrderButton = await page.$(
      'button[data-test="placeOrderButton"]'
    )
    await placeOrderButton.click()
  } catch (error) {
    throw new Error()
    console.log(error)
  } finally {
     await browser.close();
  }
}

export const scrapeTarget = async () => {
    targetReRun()
        .catch((error) => {
          console.log(error)
            console.log('failure, retry');
            setTimeout(scrapeTarget, 3 * 1000); // 5 minutes
        });
};
console.log('start');
//scrapeTarget();