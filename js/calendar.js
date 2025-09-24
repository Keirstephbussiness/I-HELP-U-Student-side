class Calendar {
            constructor() {
                this.currentDate = new Date();
                this.events = this.generateSampleEvents();
                this.init();
            }

            init() {
                this.bindEvents();
                this.render();
                this.updateCurrentMonth();
            }

            bindEvents() {
                document.getElementById('prevBtn').addEventListener('click', () => this.previousMonth());
                document.getElementById('nextBtn').addEventListener('click', () => this.nextMonth());
                document.getElementById('todayBtn').addEventListener('click', () => this.goToToday());
                document.getElementById('refreshBtn').addEventListener('click', () => this.refresh());
                
                // Modal close events
                document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
                document.getElementById('eventModal').addEventListener('click', (e) => {
                    if (e.target.id === 'eventModal') this.closeModal();
                });

                // View controls
                document.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.switchView(e.target.id));
                });
            }

            generateSampleEvents() {
                const events = {};
                const today = new Date();
                
                // Add some sample events
                const sampleEvents = [
                    { date: new Date(today.getFullYear(), today.getMonth(), 15), title: 'Team Meeting', description: 'Weekly team sync-up' },
                    { date: new Date(today.getFullYear(), today.getMonth(), 20), title: 'Project Deadline', description: 'Submit final project deliverables' },
                    { date: new Date(today.getFullYear(), today.getMonth(), 25), title: 'Client Presentation', description: 'Present Q4 results to client' },
                    { date: today, title: 'Today\'s Task', description: 'Review and approve pending requests' }
                ];

                sampleEvents.forEach(event => {
                    const dateKey = this.getDateKey(event.date);
                    if (!events[dateKey]) events[dateKey] = [];
                    events[dateKey].push(event);
                });

                return events;
            }

            getDateKey(date) {
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            }

            previousMonth() {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.render();
                this.updateCurrentMonth();
            }

            nextMonth() {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.render();
                this.updateCurrentMonth();
            }

            goToToday() {
                this.currentDate = new Date();
                this.render();
                this.updateCurrentMonth();
            }

            refresh() {
                const overlay = document.getElementById('loadingOverlay');
                overlay.classList.add('show');
                
                setTimeout(() => {
                    overlay.classList.remove('show');
                    this.render();
                }, 1500);
            }

            updateCurrentMonth() {
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                
                document.getElementById('currentMonth').textContent = 
                    `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
            }

            render() {
                const calendarDays = document.getElementById('calendarDays');
                calendarDays.innerHTML = '';

                // Add day headers
                const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                dayHeaders.forEach(day => {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day-header');
                    dayElement.textContent = day;
                    calendarDays.appendChild(dayElement);
                });

                // Get first day of month and number of days
                const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
                const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
                const startDate = new Date(firstDay);
                startDate.setDate(startDate.getDate() - firstDay.getDay());

                // Generate calendar days
                for (let i = 0; i < 42; i++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + i);
                    
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day');
                    
                    if (date.getMonth() !== this.currentDate.getMonth()) {
                        dayElement.classList.add('other-month');
                    }
                    
                    if (this.isToday(date)) {
                        dayElement.classList.add('today');
                    }

                    const dateKey = this.getDateKey(date);
                    if (this.events[dateKey]) {
                        dayElement.classList.add('has-event');
                    }

                    dayElement.innerHTML = `
                        <span class="day-number">${date.getDate()}</span>
                        ${this.events[dateKey] ? 
                            `<span class="event-indicator">${this.events[dateKey][0].title}</span>` : 
                            ''}
                    `;

                    dayElement.addEventListener('click', () => this.showEventDetails(date));
                    calendarDays.appendChild(dayElement);
                }
            }

            isToday(date) {
                const today = new Date();
                return date.getDate() === today.getDate() &&
                       date.getMonth() === today.getMonth() &&
                       date.getFullYear() === today.getFullYear();
            }

            showEventDetails(date) {
                const dateKey = this.getDateKey(date);
                const events = this.events[dateKey];
                
                const modal = document.getElementById('eventModal');
                const modalTitle = document.getElementById('modalTitle');
                const modalDate = document.getElementById('modalDate');
                const modalDescription = document.getElementById('modalDescription');

                if (events && events.length > 0) {
                    modalTitle.textContent = events[0].title;
                    modalDate.textContent = date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                    modalDescription.textContent = events[0].description;
                } else {
                    modalTitle.textContent = 'No Events';
                    modalDate.textContent = date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                    modalDescription.textContent = 'No events scheduled for this date.';
                }

                modal.classList.add('show');
            }

            closeModal() {
                document.getElementById('eventModal').classList.remove('show');
            }

            switchView(viewId) {
                document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
                document.getElementById(viewId).classList.add('active');
                
                // Here you could implement different view modes
                console.log(`Switched to ${viewId} view`);
            }
        }

        // Initialize calendar when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new Calendar();
        });