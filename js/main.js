// ===========================================
// 통합 반응형 네비게이션 (main-nav) + 메가메뉴
// ===========================================

let mobileMenuOpen = false;
let megaMenuTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
  initializeMainNav();
  initializeMegaMenu();
  initializeUnifiedSidebar();
  initializeSearchTabs();
  initializeFooter();
});

// 통합 네비게이션 초기화
function initializeMainNav() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  // 모바일 여부 체크
  function isMobile() {
    return window.innerWidth < 768;
  }

  // 메뉴 닫기 함수
  function closeMenu() {
    mobileMenuOpen = false;
    mainNav.classList.remove('active');
    document.querySelectorAll('.submenu').forEach(sub => sub.classList.remove('active'));
    document.querySelectorAll('.submenu-toggle').forEach(btn => btn.classList.remove('active'));
    document.body.style.overflow = '';

    // 햄버거 아이콘 복원
    const menuIcon = mobileMenuButton?.querySelector('.menu-icon');
    const closeIcon = mobileMenuButton?.querySelector('.close-icon');
    if (menuIcon && closeIcon) {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  // 메뉴 열기 함수
  function openMenu() {
    mobileMenuOpen = true;
    mainNav.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 햄버거 아이콘 변경
    const menuIcon = mobileMenuButton?.querySelector('.menu-icon');
    const closeIcon = mobileMenuButton?.querySelector('.close-icon');
    if (menuIcon && closeIcon) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    }
  }

  // 서브메뉴 토글 함수
  function toggleSubmenu(navItem) {
    const submenu = navItem.querySelector('.submenu');
    const toggle = navItem.querySelector('.submenu-toggle');

    if (submenu) {
      toggle?.classList.toggle('active');
      submenu.classList.toggle('active');
    }
  }

  // 모바일 메뉴 버튼 (햄버거) 클릭
  if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener('click', function() {
      if (mobileMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // 모바일 메뉴 X 버튼 클릭
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function() {
      closeMenu();
    });
  }

  // 모바일: 메뉴 링크 클릭 시 서브메뉴 토글 (서브메뉴가 있는 경우)
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (!isMobile()) return; // PC에서는 기본 동작 (링크 이동)

      const navItem = this.closest('.nav-item');
      const submenu = navItem.querySelector('.submenu');

      // 서브메뉴가 있으면 토글, 없으면 링크 이동
      if (submenu) {
        e.preventDefault();
        toggleSubmenu(navItem);
      }
    });
  });

  // 서브메뉴 토글 버튼 클릭 (화살표 버튼)
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const navItem = this.closest('.nav-item');
      toggleSubmenu(navItem);
    });
  });

  // 서브메뉴 링크 클릭 시 메뉴 닫기 (모바일)
  document.querySelectorAll('.main-nav .submenu a').forEach(link => {
    link.addEventListener('click', function() {
      if (isMobile()) {
        closeMenu();
      }
    });
  });
}

// ===========================================
// 반응형 메가메뉴 (PC hover 전용)
// ===========================================

function initializeMegaMenu() {
  const megaMenu = document.getElementById('megaMenu');
  const megaMenuTitle = document.getElementById('megaMenuTitle');
  const navItems = document.querySelectorAll('.main-nav .nav-item[data-menu]');
  const megaMenuColumns = document.querySelectorAll('.mega-menu-column[data-col]');

  if (!megaMenu || !navItems.length) return;

  // 메뉴 제목 매핑
  const menuTitles = {
    center: '센터소개',
    traffic: '교통정보',
    bus: '버스정보',
    support: '고객센터',
    directions: '길찾기'
  };

  // PC에서만 메가메뉴 동작
  function isDesktop() {
    return window.innerWidth >= 768;
  }

  // 메가메뉴 표시
  function showMegaMenu(menuType) {
    if (!isDesktop()) return;

    clearTimeout(megaMenuTimeout);

    // 제목 업데이트
    if (megaMenuTitle) {
      megaMenuTitle.textContent = menuTitles[menuType] || '센터소개';
    }

    // 활성 카테고리 표시
    megaMenuColumns.forEach(col => {
      col.classList.remove('active');
      if (col.dataset.col === menuType) {
        col.classList.add('active');
      }
    });

    // 메가메뉴 표시
    megaMenu.classList.add('active');
  }

  // 메가메뉴 숨기기
  function hideMegaMenu() {
    megaMenuTimeout = setTimeout(() => {
      megaMenu.classList.remove('active');
    }, 150);
  }

  // 네비게이션 아이템 hover 이벤트
  navItems.forEach(item => {
    const menuType = item.dataset.menu;

    item.addEventListener('mouseenter', () => {
      showMegaMenu(menuType);
    });

    item.addEventListener('mouseleave', () => {
      hideMegaMenu();
    });
  });

  // 메가메뉴 자체 hover 이벤트
  megaMenu.addEventListener('mouseenter', () => {
    clearTimeout(megaMenuTimeout);
  });

  megaMenu.addEventListener('mouseleave', () => {
    hideMegaMenu();
  });

  // 메가메뉴 내 카테고리 열 hover 시 활성화
  megaMenuColumns.forEach(col => {
    col.addEventListener('mouseenter', () => {
      const colType = col.dataset.col;

      // 제목 업데이트
      if (megaMenuTitle) {
        megaMenuTitle.textContent = menuTitles[colType] || '센터소개';
      }

      // 활성 표시 변경
      megaMenuColumns.forEach(c => c.classList.remove('active'));
      col.classList.add('active');
    });
  });

  // 화면 크기 변경 시 메가메뉴 닫기
  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      megaMenu.classList.remove('active');
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
