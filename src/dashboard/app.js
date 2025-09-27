// Simple mocked dashboard interactions for the skeleton

const patientNameEl = document.getElementById('patientName');
const patientIdEl = document.getElementById('patientId');
const patientStatusEl = document.getElementById('patientStatus');
const tokenBalanceEl = document.getElementById('tokenBalance');
const insightsList = document.getElementById('insightsList');
const activityList = document.getElementById('activityList');
const consentToggle = document.getElementById('consentToggle');
const consentStatus = document.getElementById('consentStatus');

// Mocked initial state
const state = {
  patient: { name: 'Adebayo Okorie', id: 'PAT-0001', status: 'Enrolled' },
  tokens: 120,
  consent: false,
  insights: [
    { id: 1, title: 'Sleep consistency improved', detail: 'Average sleep increased by 34 minutes over baseline.' },
    { id: 2, title: 'Activity adherence: 82%', detail: 'Wearable compliance remains high; step goals met 82% of days.' },
  ],
  activity: [
    { id: 1, text: 'Survey: Daily symptom diary — +10 tokens' },
    { id: 2, text: 'Wearable upload verified — +5 tokens' },
  ]
}

function render() {
  patientNameEl.textContent = state.patient.name
  patientIdEl.textContent = `ID: ${state.patient.id}`
  patientStatusEl.textContent = `Status: ${state.patient.status}`
  tokenBalanceEl.textContent = state.tokens
  consentToggle.checked = state.consent
  consentStatus.textContent = state.consent ? 'Consent: Given' : 'Consent: Not given'

  insightsList.innerHTML = ''
  state.insights.forEach(i => {
    const div = document.createElement('div')
    div.className = 'insight'
    div.innerHTML = `<strong>${i.title}</strong><div class="muted small">${i.detail}</div>`
    insightsList.appendChild(div)
  })

  activityList.innerHTML = ''
  state.activity.forEach(a => {
    const li = document.createElement('li')
    li.textContent = a.text
    activityList.appendChild(li)
  })
}

consentToggle.addEventListener('change', (ev) => {
  state.consent = ev.target.checked
  render()
})

document.getElementById('connectWalletBtn').addEventListener('click', () => {
  alert('Connect wallet flow is not implemented in this skeleton.');
})

document.getElementById('uploadDataBtn').addEventListener('click', () => {
  alert('Upload data flow is not implemented in this skeleton.');
})

document.getElementById('claimRewardsBtn').addEventListener('click', () => {
  state.tokens += 10
  state.activity.unshift({ id: Date.now(), text: 'Claimed rewards — +10 tokens' })
  render()
})

render()
