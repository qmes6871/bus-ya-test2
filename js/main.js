// ===========================================
// 통합 반응형 네비게이션 (main-nav)
// ===========================================

let mobileMenuOpen = false;

document.addEventListener('DOMContentLoaded', function() {
  initializeMainNav();
  initializeUnifiedSidebar();
  initializeSearchTabs();
  initializeFooter();
});

// 통합 네비게이션 초기화
function initializeMainNav() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mainNav = document.querySelector('.main-nav');
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  // 모바일 메뉴 버튼 클릭
  if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenuOpen = !mobileMenuOpen;

      if (mobileMenuOpen) {
        mainNav.classList.add('active');
      } else {
        mainNav.classList.remove('active');
        // 모든 서브메뉴 닫기
        document.querySelectorAll('.submenu').forEach(sub => sub.classList.remove('active'));
        document.querySelectorAll('.submenu-toggle').forEach(btn => btn.classList.remove('active'));
      }

      // 아이콘 변경
      const menuIcon = mobileMenuButton.querySelector('.menu-icon');
      const closeIcon = mobileMenuButton.querySelector('.close-icon');
      if (menuIcon && closeIcon) {
        menuIcon.style.display = mobileMenuOpen ? 'none' : 'block';
        closeIcon.style.display = mobileMenuOpen ? 'block' : 'none';
      }
    });
  }

  // 서브메뉴 토글 (모바일용)
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const navItem = this.closest('.nav-item');
      const submenu = navItem.querySelector('.submenu');

      if (submenu) {
        // 현재 항목 토글
        this.classList.toggle('active');
        submenu.classList.toggle('active');
      }
    });
  });

  // 메뉴 외부 클릭 시 닫기 (모바일)
  document.addEventListener('click', function(e) {
    if (mobileMenuOpen && mainNav && !mainNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      mobileMenuOpen = false;
      mainNav.classList.remove('active');

      const menuIcon = mobileMenuButton.querySelector('.menu-icon');
      const closeIcon = mobileMenuButton.querySelector('.close-icon');
      if (menuIcon && closeIcon) {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    }
  });
}

// ===========================================
// 통합 사이드바 (unified-sidebar)
// ===========================================

function initializeUnifiedSidebar() {
  const sidebarHeaders = document.querySelectorAll('.sidebar-header');

  sidebarHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // 모바일에서만 토글 동작
      if (window.innerWidth < 768) {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content && content.classList.contains('sidebar-content')) {
          content.classList.toggle('active');
        }
      }
    });
  });

  // 화면 크기 변경 시 처리
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      // 데스크톱: 사이드바 항상 표시
      document.querySelectorAll('.sidebar-content').forEach(content => {
        content.classList.remove('active');
      });
      document.querySelectorAll('.sidebar-header').forEach(header => {
        header.classList.remove('active');
      });
    }
  });
}

// ===========================================
// 기존 모바일 서브메뉴 (하위 호환)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  // 기존 mobile-sub-menu (하위 호환)
  const mobileSubMenuHeader = document.querySelector('.mobile-sub-menu-header');
  const mobileSubMenuContent = document.querySelector('.mobile-sub-menu-content');

  if (mobileSubMenuHeader && mobileSubMenuContent) {
    mobileSubMenuHeader.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileSubMenuContent.classList.toggle('active');
    });
  }
});

// ===========================================
// 검색 탭 기능
// ===========================================

function initializeSearchTabs() {
  const searchTabs = document.querySelectorAll('.search-tab');
  const searchContents = document.querySelectorAll('.search-content');

  searchTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-search-tab');

      // 탭 활성화
      searchTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // 콘텐츠 표시
      searchContents.forEach(content => {
        if (content.id === `search-${targetTab}`) {
          content.style.display = 'block';
          content.classList.add('active');
        } else {
          content.style.display = 'none';
          content.classList.remove('active');
        }
      });
    });
  });

  // 도움말 토글
  const helpBadges = document.querySelectorAll('.search-help-badge');
  helpBadges.forEach(badge => {
    badge.addEventListener('click', function() {
      const desc = this.parentElement.querySelector('.search-help-desc');
      if (desc) {
        desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
      }
    });
  });
}

// ===========================================
// 푸터 관련 기관 이동
// ===========================================

function initializeFooter() {
  const footerButton = document.querySelector('.footer-button');
  const footerSelect = document.querySelector('.footer-select');

  if (footerButton && footerSelect) {
    footerButton.addEventListener('click', function() {
      if (footerSelect.value) {
        window.open(footerSelect.value, '_blank');
      }
    });
  }
}

// ===========================================
// 교통정보 탭 (메인페이지)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  const trafficTabs = document.querySelectorAll('.traffic-tab');

  trafficTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // 탭 스타일 변경
      trafficTabs.forEach(t => {
        t.style.fontWeight = '500';
        t.style.color = '#9ca3af';
      });
      this.style.fontWeight = '600';
      this.style.color = '#374151';

      // 콘텐츠 전환
      const congestionContent = document.getElementById('congestion-content');
      const incidentContent = document.getElementById('incident-content');

      if (congestionContent && incidentContent) {
        if (targetTab === 'congestion') {
          congestionContent.style.display = 'block';
          incidentContent.style.display = 'none';
        } else {
          congestionContent.style.display = 'none';
          incidentContent.style.display = 'flex';
        }
      }
    });
  });
});
